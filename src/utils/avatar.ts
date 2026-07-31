interface AvatarStyle {
  bg: string;
  text: string;
}

const AVATAR_STYLES: AvatarStyle[] = [
  { bg: 'bg-[#DAE2FF]', text: 'text-primary' },
];

export function getInitials(fullName?: string | null): string {
  if (!fullName) return '';

  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function getAvatarStyle(seed: string): AvatarStyle {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_STYLES[Math.abs(hash) % AVATAR_STYLES.length];
}
