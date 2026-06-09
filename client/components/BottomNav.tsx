import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  {
    label: "Home",
    path: "/",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 21.0005V13.0005C15 12.7353 14.8946 12.4809 14.7071 12.2934C14.5196 12.1058 14.2652 12.0005 14 12.0005H10C9.73478 12.0005 9.48043 12.1058 9.29289 12.2934C9.10536 12.4809 9 12.7353 9 13.0005V21.0005M3 10.0005C2.99993 9.70955 3.06333 9.4221 3.18579 9.1582C3.30824 8.89429 3.4868 8.66028 3.709 8.47248L10.709 2.47248C11.07 2.16739 11.5274 2 12 2C12.4726 2 12.93 2.16739 13.291 2.47248L20.291 8.47248C20.5132 8.66028 20.6918 8.89429 20.8142 9.1582C20.9367 9.4221 21.0001 9.70955 21 10.0005V19.0005C21 19.5309 20.7893 20.0396 20.4142 20.4147C20.0391 20.7898 19.5304 21.0005 19 21.0005H5C4.46957 21.0005 3.96086 20.7898 3.58579 20.4147C3.21071 20.0396 3 19.5309 3 19.0005V10.0005Z"
          stroke="white"
          strokeOpacity={active ? 1 : 0.6}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Book",
    path: "/book",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"
          stroke="white"
          strokeOpacity={active ? 1 : 0.6}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Discover",
    path: "/discover",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 2.00044V6.00044M22 4.00044H18M11.017 2.81444C11.0598 2.58504 11.1815 2.37786 11.3611 2.22876C11.5406 2.07966 11.7666 1.99805 12 1.99805C12.2333 1.99805 12.4593 2.07966 12.6389 2.22876C12.8184 2.37786 12.9401 2.58504 12.983 2.81444L14.034 8.37244C14.1086 8.76759 14.3006 9.13106 14.585 9.41541C14.8693 9.69977 15.2328 9.8918 15.628 9.96644L21.186 11.0174C21.4153 11.0603 21.6225 11.182 21.7716 11.3615C21.9207 11.5411 22.0023 11.7671 22.0023 12.0004C22.0023 12.2338 21.9207 12.4598 21.7716 12.6393C21.6225 12.8189 21.4153 12.9406 21.186 12.9834L15.628 14.0344C15.2328 14.1091 14.8693 14.3011 14.585 14.5855C14.3006 14.8698 14.1086 15.2333 14.034 15.6284L12.983 21.1864C12.9401 21.4158 12.8184 21.623 12.6389 21.7721C12.4593 21.9212 12.2333 22.0028 12 22.0028C11.7666 22.0028 11.5406 21.9212 11.3611 21.7721C11.1815 21.623 11.0598 21.4158 11.017 21.1864L9.96595 15.6284C9.89131 15.2333 9.69928 14.8698 9.41492 14.5855C9.13057 14.3011 8.7671 14.1091 8.37195 14.0344L2.81395 12.9834C2.58456 12.9406 2.37737 12.8189 2.22827 12.6393C2.07917 12.4598 1.99756 12.2338 1.99756 12.0004C1.99756 11.7671 2.07917 11.5411 2.22827 11.3615C2.37737 11.182 2.58456 11.0603 2.81395 11.0174L8.37195 9.96644C8.7671 9.8918 9.13057 9.69977 9.41492 9.41541C9.69928 9.13106 9.89131 8.76759 9.96595 8.37244L11.017 2.81444ZM5.99995 20.0004C5.99995 21.105 5.10452 22.0004 3.99995 22.0004C2.89538 22.0004 1.99995 21.105 1.99995 20.0004C1.99995 18.8959 2.89538 18.0004 3.99995 18.0004C5.10452 18.0004 5.99995 18.8959 5.99995 20.0004Z"
          stroke="white"
          strokeOpacity={active ? 1 : 0.6}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Rewards",
    path: "/rewards",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13 5V7M13 17V19M13 11V13M2 9C2.79565 9 3.55871 9.31607 4.12132 9.87868C4.68393 10.4413 5 11.2044 5 12C5 12.7956 4.68393 13.5587 4.12132 14.1213C3.55871 14.6839 2.79565 15 2 15V17C2 17.5304 2.21071 18.0391 2.58579 18.4142C2.96086 18.7893 3.46957 19 4 19H20C20.5304 19 21.0391 18.7893 21.4142 18.4142C21.7893 18.0391 22 17.5304 22 17V15C21.2044 15 20.4413 14.6839 19.8787 14.1213C19.3161 13.5587 19 12.7956 19 12C19 11.2044 19.3161 10.4413 19.8787 9.87868C20.4413 9.31607 21.2044 9 22 9V7C22 6.46957 21.7893 5.96086 21.4142 5.58579C21.0391 5.21071 20.5304 5 20 5H4C3.46957 5 2.96086 5.21071 2.58579 5.58579C2.21071 5.96086 2 6.46957 2 7V9Z"
          stroke="white"
          strokeOpacity={active ? 1 : 0.6}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Account",
    path: "/account",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13ZM12 13C14.1217 13 16.1566 13.8429 17.6569 15.3431C19.1571 16.8434 20 18.8783 20 21M12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21"
          stroke="white"
          strokeOpacity={active ? 1 : 0.6}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto z-50"
      style={{ background: "#121212" }}
    >
      <div
        className="flex justify-around items-center"
        style={{
          paddingTop: 16,
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: "calc(24px + env(safe-area-inset-bottom, 0px))",
          gap: 28,
        }}
      >
        {NAV_ITEMS.map(({ label, path, icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className="flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px]"
            >
              <span aria-hidden="true">{icon(isActive)}</span>
              <span
                className="text-[9px] font-medium leading-none"
                style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.6)" }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* iOS home indicator */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full"
        style={{ background: "rgba(255,255,255,0.15)" }}
        aria-hidden="true"
      />
    </nav>
  );
}
