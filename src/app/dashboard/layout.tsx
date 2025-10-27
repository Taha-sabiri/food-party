


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex justify-center items-center overflow-hidden min-h-screen ">
      {children}
   
    </div>
  );
}
