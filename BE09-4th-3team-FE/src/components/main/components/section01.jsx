"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CategoryBtn } from "./categoryBtn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getDday } from "@/components/utils/dday";

export default function Section01({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const swiperRef = useRef(null);

  const slideImages = [1, 2, 3];

  useEffect(() => {
    // 페이지네이션용 업데이트
    if (swiperRef.current) {
      swiperRef.current.on("slideChange", () => {
        setCurrentIndex(swiperRef.current.realIndex + 1);
      });
    }
  }, []);

  const formatCustomDate = (date = new Date()) => {
    const yy = String(date.getFullYear()).slice(2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yy}.${mm}.${dd} ${hh}:${min}`;
  };

  return (
    <section className="pt-[38px]">
      <div className="max-w-[1160px] mx-auto flex flex-wrap justify-start pb-11">
        <div className="w-[766px] mr-[78px]">
          <div className="relative">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              loop
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setCurrentIndex(swiper.realIndex + 1);
              }}
              onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}
            >
              {slideImages.map((n) => (
                <SwiperSlide key={n}>
                  <Image
                    src={`/main/slide-items-${n}.webp`}
                    alt={`메인 슬라이드 이미지-${n}`}
                    width={766}
                    height={280}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 네비게이션 + 페이지네이션 버튼은 Swiper 바깥에 렌더링 */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
              <div className="text-white bg-black/50 rounded-[12px] px-3 py-1 text-sm">
                {currentIndex} / {slideImages.length}
              </div>
              <button className="custom-prev w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                <ChevronLeft size={20} color="white" />
              </button>
              <button className="custom-next w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                <ChevronRight size={20} color="white" />
              </button>
            </div>
          </div>
          <div className="flex overflow-x-hidden gap-[26px] min-h-[92px] mb-7 mt-3 py-5 px-4">
            <CategoryBtn
              src="/main/category-img-1.jpg"
              alt="카테고리 이미지-1"
              label="여름방학"
            />
            <CategoryBtn
              src="/main/category-img-2.jpg"
              alt="카테고리 이미지-1"
              label="여름 추구미"
            />
            <CategoryBtn
              src="/main/category-img-3.jpg"
              alt="카테고리 이미지-1"
              label="좋은 창작자"
            />
            <CategoryBtn
              src="/main/category-img-4.jpg"
              alt="카테고리 이미지-1"
              label="캐릭터 굿즈"
            />
            <CategoryBtn
              src="/main/category-img-5.jpg"
              alt="카테고리 이미지-1"
              label="푸드"
            />
            <CategoryBtn
              src="/main/category-img-6.png"
              alt="카테고리 이미지-1"
              label="출판"
            />
            <CategoryBtn
              src="/main/category-img-7.png"
              alt="카테고리 이미지-1"
              label="향수"
            />
            <CategoryBtn
              src="/main/category-img-8.png"
              alt="카테고리 이미지-1"
              label="가방"
            />
          </div>
          <div className="mx-[-6px]relative w-[778px] text-sm leading-[24px] tracking-[-0.015em] font-normal bg-white text-[#3d3d3d]">
            <h2 className="pl-[7px] text-xl leading-[29px] tracking-[-0.025em] font-bold my-4 text-[#1c1c1c] ">
              주목할 만한 프로젝트
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {projects
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 8)
                .map((project) => (
                  <Link
                    key={project.projectNo}
                    href={`/project/detail/${project.projectNo}`}
                  >
                    <div className="rounded-t-[8px]">
                      {project.thumbnailUrl ? (
                        <div className="overflow-hidden rounded-t-[8px]">
                          <Image
                            src={project.thumbnailUrl}
                            alt={project.title}
                            width={300}
                            height={300}
                            className="object-cover transition-transform rounded-b-[8px] duration-300 ease-in-out hover:scale-110"
                          />
                        </div>
                      ) : (
                        <div className="h-[264px] bg-gray-200 flex mb-[14px] items-center justify-center text-sm text-gray-500 rounded-[8px]">
                          이미지 없음
                        </div>
                      )}
                      <div className="pt-4 flex flex-col">
                        <p className="text-xs leading-[120%] text-[#545454]">
                          {project.creatorName}
                        </p>
                        <h2 className="text-sm pb-1 text-[#1c1c1c] ">
                          {project.title}
                        </h2>
                      </div>
                      <div className="pb-1 text-sm">
                        <div className="flex justify-between">
                          <div className="flex gap-1">
                            <p className="text-sm text-[#eb4b38] font-bold">
                              {project.percent}% 달성
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {new Date(project.startLine) > new Date() ? (
                          // 시작일이 미래 → 공개예정
                          <div className="bg-[#EDE9FE] w-12 text-[#7C3AED] h-[18px] text-[10px] font-bold justify-center leading-[120%] flex items-center rounded-[2px]">
                            공개예정
                          </div>
                        ) : (
                          (() => {
                            const dday = getDday(
                              project.startLine,
                              project.deadLine
                            );
                            const isProgressing =
                              typeof dday !== "string" && dday > 0;

                            return (
                              <div className="flex gap-1">
                                {isProgressing && (
                                  <div className="bg-[#e0f7e9] w-12 text-[#34a853] h-[18px] text-[10px] font-bold justify-center leading-[120%] flex items-center rounded-[2px]">
                                    진행중
                                  </div>
                                )}
                                <div className="bg-[#F3F4F6] w-12 text-[#374151] h-[18px] text-[10px] font-bold justify-center leading-[120%] flex items-center rounded-[2px]">
                                  {typeof dday === "string"
                                    ? dday
                                    : dday <= 0
                                    ? "마감"
                                    : `${dday}일 남음`}
                                </div>
                              </div>
                            );
                          })()
                        )}
                        {project.creatorName === "hoya" && (
                          <div>
                            <Image
                              src={"/main/goodCreator.png"}
                              alt="좋은 창작자"
                              width={60}
                              height={17}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        {/* 측면 인기 프로젝트 */}
        <div className="max-w-[314px] w-[calc(100%-844px)]">
          <div className="mb-[22px]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl text-[#0d0d0d]">인기 프로젝트</h2>
              <Link
                href="/project/list"
                className="text-sm font-normal leading-[120%] text-[#545454]"
              >
                전체보기
              </Link>
            </div>
            <span className="text-xs text-[#6d6d6d] font-normal mt-[2px]]">
              {formatCustomDate()} 기준
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {projects
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 8)
              .map((project, idx) => (
                <Link
                  key={project.projectNo}
                  href={`/project/detail/${project.projectNo}`}
                >
                  <div className="flex rounded-[8px] overflow-hidden hover:shadow-md transition">
                    {/* 이미지 */}
                    {project.thumbnailUrl ? (
                      <Image
                        src={project.thumbnailUrl}
                        alt={project.title}
                        width={116}
                        height={116}
                        className="object-cover w-[116px] h-[116px] flex-shrink-0 rounded-[8px] hover:scale-110 duration-300 ease-in-out transition-all"
                      />
                    ) : (
                      <div className="w-[116px] h-[116px] bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded-[8px] flex-shrink-0">
                        이미지 없음
                      </div>
                    )}
                    <span
                      className={`font-bold text-sm leading-[120%] pl-[11px] ${
                        idx < 3 ? "text-[#eb4b38]" : "text-[#1c1c1c]"
                      }`}
                    >
                      {idx + 1}
                    </span>

                    {/* 텍스트 설명 */}
                    <div className="ml-4 flex flex-col justify-start gap-1 flex-1">
                      <div>
                        <p className="text-xs leading-[120%] text-[#545454]">
                          {project.creatorName}
                        </p>
                        <h2 className="text-base text-[#1c1c1c]">
                          {project.title}
                        </h2>
                      </div>
                      <div className="pb-1 text-sm flex flex-col gap-1">
                        <p className="text-sm text-[#eb4b38] font-bold">
                          {project.percent}% 달성
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {new Date(project.startLine) > new Date() ? (
                          // 시작일이 미래 → 공개예정
                          <div className="bg-[#EDE9FE] w-12 text-[#7C3AED] h-[18px] text-[10px] font-bold justify-center leading-[120%] flex items-center rounded-[2px]">
                            공개예정
                          </div>
                        ) : (
                          (() => {
                            const dday = getDday(
                              project.startLine,
                              project.deadLine
                            );
                            const isProgressing =
                              typeof dday !== "string" && dday > 0;

                            return (
                              <div className="flex gap-1">
                                {isProgressing && (
                                  <div className="bg-[#e0f7e9] w-12 text-[#34a853] h-[18px] text-[10px] font-bold justify-center leading-[120%] flex items-center rounded-[2px]">
                                    진행중
                                  </div>
                                )}
                                <div className="bg-[#F3F4F6] w-12 text-[#374151] h-[18px] text-[10px] font-bold justify-center leading-[120%] flex items-center rounded-[2px]">
                                  {typeof dday === "string"
                                    ? dday
                                    : dday <= 0
                                    ? "마감"
                                    : `${dday}일 남음`}
                                </div>
                              </div>
                            );
                          })()
                        )}
                        {project.creatorName === "hoya" && (
                          <div>
                            <Image
                              src={"/main/goodCreator.png"}
                              alt="좋은 창작자"
                              width={60}
                              height={17}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
