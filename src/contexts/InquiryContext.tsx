import React, { createContext, useContext, useState, ReactNode } from "react";

interface InquiryContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export const InquiryProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <InquiryContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
};
