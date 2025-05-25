"use client";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-6 m-2 bg-white rounded">
        <div className="p-2">
          <input type="text" placeholder="username" />
        </div>
        <div className="p-2">
          <input type="password" placeholder="password" />
        </div>
        <button className="bg-black p-2 rounded" onClick={() => {}}>{isSignin ? "Sign in" : "Sign up"}</button>
      </div>
    </div>
  );
}
