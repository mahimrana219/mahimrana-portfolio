import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Download, ExternalLink, ArrowLeft } from "lucide-react";
import { useState } from "react";
import AtsResume from "./Ats"; 

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

const ResumeModal = ({ isOpen, onClose, pdfUrl }: ResumeModalProps) => {
  const [viewMode, setViewMode] = useState<"menu" | "ats">("menu");

  const handleClose = () => {
    setViewMode("menu"); 
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50"
            onClick={handleClose}
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 180 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] ${
              viewMode === "ats" 
                ? "w-[95%] max-w-4xl h-[90vh] overflow-y-auto p-4 md:p-6 bg-slate-900 border border-[#00E4FF]/40 rounded-2xl shadow-2xl" 
                : "w-[92%] max-w-md p-6 md:p-8 bg-black/95 border border-[#00E4FF]/40 rounded-2xl shadow-[0_0_100px_-20px_rgba(0,228,255,0.4)] backdrop-blur-2xl"
            }`}
          >
            {/* Top Navigation / Close Controls */}
            <div className="flex items-center justify-between mb-4">
              {viewMode === "ats" ? (
                <button
                  onClick={() => setViewMode("menu")}
                  className="flex items-center gap-1.5 text-xs text-[#00E4FF] hover:underline bg-black/40 px-3 py-1.5 rounded-lg border border-[#00E4FF]/20"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Options
                </button>
              ) : (
                <div />
              )}

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="ml-auto text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-black/50 border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conditional Rendering: Menu View vs ATS Resume Component View */}
            {viewMode === "menu" ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#00E4FF]/10 border border-[#00E4FF]/30 flex items-center justify-center text-[#00E4FF]">
                    <FileText className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    My <span className="text-[#00E4FF]">Resume</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Choose how you would like to access my ATS-friendly resume
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* View Online Button -> Switches to AtsResume View */}
                  <button
                    onClick={() => setViewMode("ats")}
                    className="w-full py-3.5 px-4 rounded-xl border border-[#00E4FF]/40 bg-[#00E4FF]/10 hover:bg-[#00E4FF]/20 text-white font-semibold text-xs md:text-sm flex items-center justify-between transition-all group shadow-[0_0_20px_rgba(0,228,255,0.15)] cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <ExternalLink className="w-4 h-4 text-[#00E4FF]" />
                      <span>View Online (ATS Version)</span>
                    </div>
                    <span className="text-[#00E4FF] text-xs font-bold group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  {/* Download PDF Button */}
                  <a
                    href={pdfUrl}
                    download="Mahim_Rana_Resume.pdf"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#00E4FF] hover:bg-[#00E4FF]/90 text-black font-bold text-xs md:text-sm flex items-center justify-between transition-all shadow-[0_0_25px_rgba(0,228,255,0.3)]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </div>
                    <span className="text-xs font-semibold">.PDF</span>
                  </a>
                </div>

                {/* Footer Note */}
                <div className="mt-6 text-center">
                  <p className="text-[11px] text-gray-500">
                    Full-Stack Software Engineer · Mobile Apps · MERN Stack
                  </p>
                </div>
              </>
            ) : (
             
              <div className="py-2">
                <AtsResume pdfUrl={pdfUrl} />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;