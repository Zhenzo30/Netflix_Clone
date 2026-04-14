import { Film } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/Dialog";

interface INetflixGPTModalProps {
    isNetflixGPTModalOpen: boolean;
    setIsNetflixGPTModalOpen: (isOpen: boolean) => void;
}

const NetflixGPTModal = ({ isNetflixGPTModalOpen, setIsNetflixGPTModalOpen }: INetflixGPTModalProps) => {
    return (
        <Dialog 
        open={isNetflixGPTModalOpen} 
        onOpenChange={() => setIsNetflixGPTModalOpen(false)}
        >
            <DialogContent className="bg-[#1a1a1a] max-w-2xl! w-full gap-10 overflow-y-auto text-white border-[#333333]">
                <DialogHeader>
                    <DialogTitle className="mb-2 flex gap- items-center text-2xl font-bold">
                        <Film className="w-6 h-6 text-[#ff0000]"/>
                        Find Your Perfect Movie.
                    </DialogTitle>
                    <DialogDescription className="text-[#999999]">
                        Adjust your preferences to get the best recommendations.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
};

export default NetflixGPTModal;