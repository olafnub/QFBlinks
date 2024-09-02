import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link'; 

export default function MatchFunds() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Match Funds</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>What are Match Funds?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Match funds are additional contributions made by sponsors or organizations to amplify the impact of individual donations. In the context of Quadratic Funding (QF), match funds play a crucial role in boosting the effectiveness of smaller contributions.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Sponsors contribute to the match fund pool</li>
              <li>Individual donors make contributions to projects</li>
              <li>The QF algorithm calculates optimal fund distribution</li>
              <li>Match funds are allocated to maximize impact</li>
            </ol>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Contribute to Match Funds</CardTitle>
          <CardDescription>Your contribution will be used to amplify the impact of individual donations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input type="number" placeholder="Enter amount" />
            <Button>Contribute</Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">All contributions are securely processed and distributed according to the QF algorithm.</p>
        </CardFooter>
      </Card>
      <div className="mt-8 text-center">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}