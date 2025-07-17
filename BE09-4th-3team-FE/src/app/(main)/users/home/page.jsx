// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function HomePage() {
//   const [accessToken, setAccessToken] = useState(null);
//   const [userInfo, setUserInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   // 👇 이 부분 수정! 바로 마이페이지로 리다이렉트
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const accessToken = urlParams.get("accessToken");
//     const refreshToken = urlParams.get("refreshToken");

//     if (accessToken) {
//       sessionStorage.setItem("accessToken", accessToken);
//     }
//     if (refreshToken) {
//       sessionStorage.setItem("refreshToken", refreshToken);
//     }

//     // accessToken이 있으면 바로 마이페이지로 이동 (중간 페이지 없이)
//     if (accessToken) {
//       router.replace("/users/dropdownmenu/mypage");
//       return; // 리다이렉트 후 아래 코드 실행 방지
//     }

//     // 토큰이 없으면 로그인 페이지로 이동
//     router.replace("/users/login");
//   }, [router]);

//   // 컴포넌트 마운트 시 사용자 정보 확인 (토큰이 있을 때만)
//   useEffect(() => {
//     const checkUserInfo = () => {
//       try {
//         // 로컬스토리지에서 토큰 확인
//         const accessToken = sessionStorage.getItem("accessToken");
//         const refreshToken = sessionStorage.getItem("refreshToken");

//         if (accessToken && refreshToken) {
//           setUserInfo({
//             hasToken: true,
//             tokenInfo: {
//               accessToken: accessToken.substring(0, 20) + "...", // 보안을 위해 일부만 표시
//               refreshToken: refreshToken.substring(0, 20) + "...",
//             },
//           });
//         } else {
//           setUserInfo({ hasToken: false });
//         }
//       } catch (error) {
//         console.error("사용자 정보 확인 중 오류:", error);
//         setUserInfo({ hasToken: false, error: true });
//       } finally {
//         setLoading(false);
//       }
//     };

//     // URL 파라미터에 토큰이 없을 때만 사용자 정보 확인
//     const urlParams = new URLSearchParams(window.location.search);
//     const accessToken = urlParams.get("accessToken");

//     if (!accessToken) {
//       checkUserInfo();
//     }
//   }, []);

//   // 🚀 개선점: 메인 페이지로 이동 핸들러
//   const handleGoToMain = () => {
//     window.location.href = "/";
//   };

//   // 🚀 개선점: 로그아웃 핸들러
//   const handleLogout = () => {
//     sessionStorage.removeItem("accessToken");
//     sessionStorage.removeItem("refreshToken");
//     sessionStorage.clear();
//     window.location.href = "/users/login";
//   };

//   // 토큰이 있으면 로딩 화면만 표시 (리다이렉트 중)
//   const urlParams = new URLSearchParams(window.location.search);
//   const accessToken = urlParams.get("accessToken");

//   if (accessToken) {
//     return (
//       <div
//         style={{
//           padding: "50px",
//           textAlign: "center",
//           minHeight: "100vh",
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           color: "white",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div>
//           <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
//             로그인 성공! 마이페이지로 이동 중...
//           </h1>
//           <div style={{ fontSize: "1.2rem" }}>잠시만 기다려주세요.</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         padding: "50px",
//         textAlign: "center",
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         color: "white",
//       }}
//     >
//       <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
//         🎉 로그인 성공!
//       </h1>

//       <div
//         style={{
//           background: "rgba(255, 255, 255, 0.1)",
//           padding: "30px",
//           borderRadius: "15px",
//           backdropFilter: "blur(10px)",
//           maxWidth: "600px",
//           margin: "0 auto",
//         }}
//       >
//         <p style={{ fontSize: "1.2rem", marginBottom: "15px" }}>
//           여기는 임시 Home 페이지입니다.
//         </p>

//         <p
//           style={{ fontSize: "1rem", marginBottom: "20px", lineHeight: "1.6" }}
//         >
//           토큰은 쿠키에 저장되어 있으며, 백엔드 API 호출로 사용자 정보를 확인할
//           수 있습니다.
//         </p>

//         {/* 로딩 상태 표시 */}
//         {loading && (
//           <div style={{ marginBottom: "20px", color: "#ccc" }}>
//             사용자 정보를 확인하는 중...
//           </div>
//         )}

//         {/* 사용자 정보 표시 */}
//         {userInfo && !loading && (
//           <div style={{ marginBottom: "20px" }}>
//             <h3 style={{ marginBottom: "10px" }}>현재 상태:</h3>
//             {userInfo.hasToken ? (
//               <div style={{ textAlign: "left" }}>
//                 <p>✅ 토큰이 저장되어 있습니다.</p>
//                 <p>Access Token: {userInfo.tokenInfo.accessToken}</p>
//                 <p>Refresh Token: {userInfo.tokenInfo.refreshToken}</p>
//               </div>
//             ) : (
//               <div>
//                 <p>❌ 토큰이 없습니다.</p>
//                 {userInfo.error && (
//                   <p style={{ color: "#ff6b6b" }}>오류가 발생했습니다.</p>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* 버튼들 */}
//         <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
//           <button
//             onClick={handleGoToMain}
//             style={{
//               padding: "12px 24px",
//               backgroundColor: "#4CAF50",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//               fontSize: "16px",
//               fontWeight: "bold",
//             }}
//           >
//             메인 페이지로
//           </button>
//           <button
//             onClick={handleLogout}
//             style={{
//               padding: "12px 24px",
//               backgroundColor: "#f44336",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//               fontSize: "16px",
//               fontWeight: "bold",
//             }}
//           >
//             로그아웃
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
