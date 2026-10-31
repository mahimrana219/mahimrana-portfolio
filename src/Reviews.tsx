import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Send, CheckCircle2 } from "lucide-react";

const Reviews = () => {
  const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);

  // Form States
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xlgqwwqk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          rating: `${rating} Stars`,
          message,
        }),
      });

      if (response.ok) {
        setSubmittedSuccessfully(true);
        setName("");
        setEmail("");
        setMessage("");
        setRating(5);
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full py-10 flex items-center justify-center bg-background transition-colors duration-300">
      {/* Single Review Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setSubmittedSuccessfully(false);
          setShowWriteReviewModal(true);
        }}
        style={{ borderColor: "rgba(0, 225, 252, 0.4)", backgroundColor: "rgba(0, 225, 252, 0.15)", boxShadow: "0 0 25px rgba(0, 225, 252, 0.25)" }}
        className="px-6 py-3 rounded-xl text-foreground text-sm md:text-base font-semibold flex items-center gap-2.5 transition-all duration-300 cursor-pointer"
      >
        <Star style={{ color: "#00E1FC", fill: "#00E1FC" }} className="w-5 h-5" />
        Write a review if you are satisfied
      </motion.button>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {showWriteReviewModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-50"
              onClick={() => setShowWriteReviewModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 180 }}
              style={{ borderColor: "rgba(0, 225, 252, 0.4)", boxShadow: "0 0 50px -10px rgba(0, 225, 252, 0.2)" }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[92%] max-w-lg rounded-2xl bg-card p-6 md:p-8 text-card-foreground"
            >
              <button
                onClick={() => setShowWriteReviewModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full bg-muted border border-border cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {submittedSuccessfully ? (
                <div className="text-center py-8 space-y-4">
                  <div 
                    style={{ borderColor: "#00E1FC", backgroundColor: "rgba(0, 225, 252, 0.15)", color: "#00E1FC" }}
                    className="w-16 h-16 mx-auto rounded-full border flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Thank you for your review!</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    It means a lot to me. Your feedback has been received successfully.
                  </p>
                  <button
                    onClick={() => setShowWriteReviewModal(false)}
                    style={{ backgroundColor: "#00E1FC", color: "#000000" }}
                    className="mt-4 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-md"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                      <span style={{ color: "#00E1FC" }}>Write</span> Your Review
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Share your experience working together</p>
                  </div>

                  {/* Star Rating Input */}
                  <div className="py-2">
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Your Rating</label>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                        >
                          <Star
                            style={{
                              color: (hoverRating || rating) >= star ? "#00E1FC" : undefined,
                              fill: (hoverRating || rating) >= star ? "#00E1FC" : undefined,
                            }}
                            className={`w-6 h-6 transition-colors ${
                              (hoverRating || rating) >= star
                                ? ""
                                : "text-muted-foreground/30"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      style={{ outlineColor: "#00E1FC" }}
                      onFocus={(e) => e.target.style.borderColor = "#00E1FC"}
                      onBlur={(e) => e.target.style.borderColor = ""}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/50 text-foreground text-xs transition-colors"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Your Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      onFocus={(e) => e.target.style.borderColor = "#00E1FC"}
                      onBlur={(e) => e.target.style.borderColor = ""}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/50 text-foreground text-xs transition-colors"
                      required
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Your Feedback / Review *</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your review here..."
                      onFocus={(e) => e.target.style.borderColor = "#00E1FC"}
                      onBlur={(e) => e.target.style.borderColor = ""}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/50 text-foreground text-xs transition-colors resize-none"
                      required
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-[11px] text-red-500 font-medium">{errorMessage}</p>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{ backgroundColor: "#00E1FC", color: "#000000", boxShadow: "0 0 20px rgba(0, 225, 252, 0.25)" }}
                      className="w-full py-3 rounded-xl font-bold text-xs md:text-sm tracking-wide flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer hover:opacity-90"
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Submit Review
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Reviews;