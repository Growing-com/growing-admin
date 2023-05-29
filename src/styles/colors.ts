
export type tColor = 
    "white"
    | "black"
    | "green200" 
    | "green100" 
    | "grey100" 
    | "grey80" 
    | "grey70" 
    | "grey50" 
    | "grey30" 
    | "grey20" 
    |  "grey60"
    | "grey40"   

export const Color: Record<tColor,string> = {
    green200:'#20C895',
    green100: '#27fbbc33',
    grey100:'#E0E0E0',
    grey80: "#f5f5f7",
    grey70:'#5C5C5C',
    grey60: '#EAEAEA',
    grey50: 'rgba(0, 0, 0, 0.45)',
    grey40: "#B8BCC8",
    grey30: '#222222',
    grey20: '#EEF0F6',
    black: "#000000",
    white: '#FFFFFF',
}