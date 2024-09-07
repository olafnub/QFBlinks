import {
    ActionPostResponse,
    createPostResponse,
    ActionGetResponse,
    ActionPostRequest,
    createActionHeaders,
  } from '@solana/actions';
  import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Transaction,
  } from '@solana/web3.js';
import * as splToken from "@solana/spl-token"

const SOLANA_MAINNET_USDC_PUBKEY = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

const headers = createActionHeaders();

export const GET = async (req: Request) => {
    try {
        const requestUrl = new URL(req.url)
        const { toPubKey } = validatedQueryParams(requestUrl)
        
        const baseHref = new URL(
            `/api/actions/donate-usdc-3?to=${toPubKey.toBase58()}`,
            requestUrl.origin
        ).toString()

        const payload: ActionGetResponse = {
            type: "action",
            title: "Raising and donating money for animals",
            icon: "https://media2.giphy.com/media/1wpaCOVdglMSYgjCum/200.gif?cid=6c09b952l36nng0fsz3omt1xg12th3h65ptr7dky6mzicox0&ep=v1_internal_gif_by_id&rid=200.gif&ct=g",
            description: "Helping of our furry friends. By donating to this track, you'll provide essential resources to animal shelters, helping them care for abandoned, abused, and homeless animals. Your contributions will ensure these animals receive the medical care, food. (3/3)",
            label: "Donate",
            links: {
                actions: [
                    {
                        label: "1 USDC",
                        href: `${baseHref}&amount=${'1'}`
                    },
                    {
                        label: "3 USDC",
                        href: `${baseHref}&amount=${'3'}`
                    },
                    {
                        label: "5 USDC",
                        href: `${baseHref}&amount=${'5'}`
                    },
                    {
                        label: "Donate USDC",
                        href: `${baseHref}&amount={amount}`,
                        parameters: [
                            {
                                name: "amount",
                                label: "Enter the amount of USDC to donate",
                                required: true
                            }
                        ]
                    }
                ]
            }
        }

        return Response.json(payload, {
            headers,
        })        
    } catch (err) {
        console.log(err)
        let message = 'An unknown error occurred';
        if (typeof err == 'string') message = err
        return new Response(message, {
            status: 400,
            headers
        })
    }
}

export const OPTIONS = GET

export const POST = async (req: Request) => {
    try {
      const requestUrl = new URL(req.url);
      const { amount, toPubKey } = validatedQueryParams(requestUrl);
  
      const body: ActionPostRequest = await req.json();
  
      // validate the client provided input
      let account: PublicKey;
      try {
        account = new PublicKey(body.account);
      } catch (err) {
        return new Response('Invalid "account" provided', {
          status: 400,
          headers,
        });
      }
  
      const connection = new Connection(clusterApiUrl('mainnet-beta'));
      const decimals = 6; // In the example, we use 6 decimals for USDC, but you can use any SPL token
      const mintAddress = new PublicKey(SOLANA_MAINNET_USDC_PUBKEY); // replace this with any SPL token mint address
  
      // converting value to fractional units
  
      let transferAmount: any = parseFloat(amount.toString());
      transferAmount = transferAmount.toFixed(decimals);
      transferAmount = transferAmount * Math.pow(10, decimals);
  
      const fromTokenAccount = await splToken.getAssociatedTokenAddress(
        mintAddress,
        account,
        false,
        splToken.TOKEN_PROGRAM_ID,
        splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      );
  
      let toTokenAccount = await splToken.getAssociatedTokenAddress(
        mintAddress,
        toPubKey,
        true,
        splToken.TOKEN_PROGRAM_ID,
        splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      );
  
      const ifexists = await connection.getAccountInfo(toTokenAccount);
  
      let instructions = [];
  
      if (!ifexists || !ifexists.data) {
        let createATAiX = splToken.createAssociatedTokenAccountInstruction(
          account,
          toTokenAccount,
          toPubKey,
          mintAddress,
          splToken.TOKEN_PROGRAM_ID,
          splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
        );
        instructions.push(createATAiX);
      }
  
      let transferInstruction = splToken.createTransferInstruction(
        fromTokenAccount,
        toTokenAccount,
        account,
        transferAmount,
      );
      instructions.push(transferInstruction);
  
      const transaction = new Transaction();
      transaction.feePayer = account;
  
      transaction.add(...instructions);
  
      // set the end user as the fee payer
      transaction.feePayer = account;
  
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
  
      const payload: ActionPostResponse = await createPostResponse({
        fields: {
          transaction,
          message: `Donated ${amount} USDC to ${toPubKey.toBase58()}`,
        },
        // note: no additional signers are needed
        // signers: [],
      });
  
      return Response.json(payload, {
        headers,
      });
    } catch (err) {
      console.log(err);
      let message = 'An unknown error occurred';
      if (typeof err == 'string') message = err;
      return new Response(message, {
        status: 400,
        headers,
      });
    }
  };

  function validatedQueryParams(requestUrl: URL) {
    let toPubKey: PublicKey = new PublicKey(
        "WoA2FZC8vaWHpvZKSpR9N5Dm5U7hD23RpXFYYUhhFbJ"
    )
    let amount: number = 10
    
    try {
    if (requestUrl.searchParams.get('to')) {
        toPubKey = new PublicKey(requestUrl.searchParams.get('to')!);
      }
    } catch (err) {
      throw 'Invalid input query parameter: to';
    }
  
    try {
      if (requestUrl.searchParams.get('amount')) {
        amount = parseFloat(requestUrl.searchParams.get('amount')!);
      }
  
      if (amount <= 0) throw 'amount is too small';
    } catch (err) {
      throw 'Invalid input query parameter: amount';
    }


    return {
        amount,
        toPubKey
    }
}