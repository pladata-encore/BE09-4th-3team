"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Section01() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (token) {
      setIsLogin(true); // 토큰이 있을 경우에만 로그인 상태로 설정
    } else {
      setIsLogin(false); // 토큰이 없으면 비로그인 상태로 설정
    }
  }, []);

  return (
    <section className="mt-[100px]">
      <div>
        <h2 className="font-semibold text-[#0d0d0d] text-center text-[32px]">
          누구나 쉽고 빠르게 <br /> 프로젝트를 시작할 수 있습니다.
        </h2>
        <p className="mt-5 text-[#6d6d6d] text-center">취향이 모여 세상을 바꾸는 텀블벅에서</p>
        <div className="flex justify-center gap-3 mt-9">
          <Link
            href={`${isLogin ? "/project/main" : "/users/login"}`}
            className="py-[11px] px-6 bg-[#f86453] cursor-pointer text-white text-[14px]"
          >
            지금 시작하기
          </Link>
          <Link href="#" className="py-[11px] px-6 border border-[#e4e4e4] bg-white text-[14px] text-[#3d3d3d]">
            창작자 가이드
          </Link>
        </div>
      </div>
    </section>
  );
}
