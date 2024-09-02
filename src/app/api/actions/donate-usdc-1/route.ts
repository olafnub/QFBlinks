import {
  ActionPostResponse,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
  createActionHeaders,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import * as spltoken from "@solana/spl-token"

const SOLANA_MAINNET_USDC_PUBKEY = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

const headers = createActionHeaders();

function validatedQueryParams(requestUrl: URL) {
    let toPubKey: PublicKey = new PublicKey(
        "H2nk7zAmhe1J6u7VMmLBbB42aWpgvozHJWE1qx2rRQxQ"
    )
    let amount: number = 0.1


    return {
        amount,
        toPubKey
    }
}

export const GET = async (req: Request) => {
    try {
        const requestUrl = new URL(req.url)
        const { toPubKey } = validatedQueryParams(requestUrl)
        
        const baseHref = new URL(
            `/api/actions/donate-usdc?to=${toPubKey.toBase58()}`,
            requestUrl.origin
        ).toString()

        const payload: ActionGetResponse = {
            type: "action",
            title: "Raising money for individuals",
            icon: "https://media4.giphy.com/media/3o7TKvGMtjHddB1vxu/giphy.gif?cid=6c09b9520z839b8x1l45zm8gvqdfjrvgyr6rueonr4qt5bxr&ep=v1_gifs_search&rid=giphy.gif&ct=g",
            description: "Dedicated to helping those who need a hand up. Whether it's supporting someone's education, covering unexpected medical expenses, or simply helping them get back on their feet, your donations can make a life-changing difference. By contributing to this track you will impact individuals directly. (1/3)",
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

