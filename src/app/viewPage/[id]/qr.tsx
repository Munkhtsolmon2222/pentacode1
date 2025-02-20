import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const QRScan = () => {
  return (
    <div className="mt-40">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="flex justify-center text-[#161616] text-lg">
              Scan QR code
            </DialogTitle>
            <DialogDescription className="flex justify-center text-[#161616] text-md">
              Scan the QR code to complete your donation
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center my-6">
            <img src="/QR.png" alt="qr" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
