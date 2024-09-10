import React from 'react';
import Header from './Header';  
import Footer from './Footer';  

interface WrapperProps {
  children: React.ReactNode;  
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Wrapper;
