import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';

export default function Individual() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Individual Donator</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Make a Donation</CardTitle>
          <CardDescription>Your contribution will be amplified through Quadratic Funding</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select a Track</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a track" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individuals">Individuals</SelectItem>
                  <SelectItem value="causes">Causes</SelectItem>
                  <SelectItem value="animals">Animals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Donation Amount</label>
              <Input type="number" placeholder="Enter amount" />
            </div>
            <Button className="w-full">Donate</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Why Your Donation Matters</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Through Quadratic Funding, your donation has a greater impact. Here&#39;s how:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Small donations are amplified</li>
            <li>Diverse projects receive more support</li>
            <li>Community preferences are better represented</li>
            <li>Your contribution influences the allocation of matching funds</li>
          </ul>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">Learn more about <Link href="https://www.wtfisqf.com" className="text-blue-500 hover:underline">Quadratic Funding</Link></p>
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