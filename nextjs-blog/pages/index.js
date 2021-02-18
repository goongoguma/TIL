import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Modal = dynamic(() => import('../components/Modal'), { ssr: false });

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} />
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
    </>
  )
};
