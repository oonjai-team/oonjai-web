import React from 'react';

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function AccountIcon({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M18 20C18 18.4087 17.3679 16.8826 16.2426 15.7574C15.1174 14.6321 13.5913 14 12 14C10.4087 14 8.88258 14.6321 7.75736 15.7574C6.63214 16.8826 6 18.4087 6 20" stroke="#365C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z" stroke="#365C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#365C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function BookIcon({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 7V21" stroke="#365C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 18C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7C12 5.93913 12.4214 4.92172 13.1716 4.17157C13.9217 3.42143 14.9391 3 16 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V17C22 17.2652 21.8946 17.5196 21.7071 17.7071C21.5196 17.8946 21.2652 18 21 18H15C14.2044 18 13.4413 18.3161 12.8787 18.8787C12.3161 19.4413 12 20.2044 12 21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H3Z" stroke="#365C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function HandRequestIcon({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3V2" stroke="#365C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.4 17.3997L18.6 14.5997C18.7904 14.4159 19.0152 14.2713 19.2615 14.1744C19.5077 14.0774 19.7707 14.0298 20.0354 14.0345C20.3 14.0391 20.5611 14.0959 20.8039 14.2014C21.0466 14.307 21.2662 14.4593 21.45 14.6497C21.6339 14.8402 21.7784 15.0649 21.8754 15.3112C21.9724 15.5575 22.0199 15.8205 22.0153 16.0851C22.0106 16.3497 21.9539 16.6109 21.8483 16.8536C21.7428 17.0963 21.5904 17.3159 21.4 17.4997L17.8 20.7997C17.1 21.5997 16.1 21.9997 15 21.9997H11C9.9 21.9997 8.9 21.5997 8.2 20.7997L6.898 19.3357C6.80426 19.2302 6.68923 19.1457 6.56048 19.0878C6.43173 19.0298 6.29218 18.9998 6.151 18.9997H5" stroke="#365C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 14H14C14.5304 14 15.0391 14.2107 15.4142 14.5858C15.7893 14.9609 16 15.4696 16 16C16 16.5304 15.7893 17.0391 15.4142 17.4142C15.0391 17.7893 14.5304 18 14 18H12" stroke="#365C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 10H20" stroke="#365C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 10C5 8.14348 5.7375 6.36301 7.05025 5.05025C8.36301 3.7375 10.1435 3 12 3C13.8565 3 15.637 3.7375 16.9497 5.05025C18.2625 6.36301 19 8.14348 19 10" stroke="#365C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 14V20C5 20.2652 4.89464 20.5196 4.70711 20.7071C4.51957 20.8946 4.26522 21 4 21H2" stroke="#365C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function CalendarIcon({ className, width = 18, height = 20 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 18 20" fill="none" className={className}>
      <path d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6ZM2 6V4V6Z" fill="#365C48"/>
    </svg>
  );
}

export function ClockIcon({ className, width = 20, height = 20 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M13.3 14.7L14.7 13.3L11 9.6V5H9V10.4L13.3 14.7ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2167 18 14.1042 17.2208 15.6625 15.6625C17.2208 14.1042 18 12.2167 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18Z" fill="#365C48"/>
    </svg>
  );
}
