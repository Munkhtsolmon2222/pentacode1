'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  country: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  cardNumber: z.string().min(16),
  month: z.string().min(1),
  year: z.string().min(1),
  cvc: z.string().length(3)
});

type FormValues = z.infer<typeof formSchema>;

export default function EditBankCard() {
  const { register, handleSubmit, setValue,watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: FormValues) => {
    console.log('Submitted Data:', data);
  };
  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, ''); 
    value = value.slice(0, 16); 
    const formattedValue = value.replace(/(\d{4})/g, '$1-').replace(/-$/, ''); 
    setValue('cardNumber', formattedValue);
  };
  return (
    <Card className="w-full max-w-md mx-auto mt-[300px] p-6">
      <CardContent>
        <h2 className="text-xl font-bold">Payment details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Select country</Label>
            <Select onValueChange={(val: any) => setValue('country', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
                <SelectItem value="Mongolia">Mongolia</SelectItem>
              </SelectContent>
            </Select>
            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <Label>First name</Label>
              <Input {...register('firstName')} placeholder="Enter your name here" />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
            <div className="flex-1">
              <Label>Last name</Label>
              <Input {...register('lastName')} placeholder="Enter your name here" />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
          </div>
          <div>
            <Label>Enter card number</Label>
            <Input {...register('cardNumber')} 
              placeholder="XXXX-XXXX-XXXX-XXXX" 
              maxLength={19} 
              value={watch('cardNumber') || ''} 
              onChange={handleCardNumberChange}  />
            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>}
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <Label>Expires</Label>
              <Select onValueChange={(val: any) => setValue('month', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem key="Jan" value='January'>January</SelectItem>
                    <SelectItem key="Feb" value='February'>February</SelectItem>
                    <SelectItem key="Mar" value='March'>March</SelectItem>
                    <SelectItem key="Apr" value='April'>April</SelectItem>
                    <SelectItem key="May" value='May'>May</SelectItem>
                    <SelectItem key="Jun" value='June'>June</SelectItem>
                    <SelectItem key="Jul" value='July'>July</SelectItem>
                    <SelectItem key="Aug" value='August'>August</SelectItem>
                    <SelectItem key="Sep" value='September'>September</SelectItem>
                    <SelectItem key="Oct" value='October'>October</SelectItem>
                    <SelectItem key="Nov" value='November'>November</SelectItem>
                    <SelectItem key="Dec" value='December'>December</SelectItem>
                   
                </SelectContent>
              </Select>
              {errors.month && <p className="text-red-500 text-sm">{errors.month.message}</p>}
            </div>
            <div className="flex-1">
              <Label>Year</Label>
              <Select onValueChange={(val: any) => setValue('year', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i} value={(2025 + i).toString()}>{2025 + i}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
            </div>
            <div className="flex-1">
              <Label>CVC</Label>
              <Input {...register('cvc')} placeholder="CVC" maxLength={3} />
              {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc.message}</p>}
            </div>
          </div>
          <Button type="submit" className="w-full bg-gray-300 text-gray-500 cursor-not-allowed" disabled>Save changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}