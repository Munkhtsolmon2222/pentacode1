"use client"
import { useState } from "react";
import CreateBankCard from "../_components/bank/CreateBankCard";
import CreateProfile from "../_components/profile/CreateProfile";

export default function Page() {
    const [step, setStep] = useState<any>(1);
  return (
    <div>
      {step == 1 ?  <CreateProfile setStep={setStep} /> : <CreateBankCard />}
  
    </div>
  );
}