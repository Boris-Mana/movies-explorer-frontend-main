import { WIDTHBIGSCR, WIDTHSMALLSCR, LENGTHBIG, LENGTHMIDDLE, LENGTHSMALL } from "../utils/constants";

export const getOnScreenArr = (workArr, counterMoreClick) => { 
    const screenWidth = window.innerWidth;
    const allLength = workArr.length;
    
    let maxLength = LENGTHBIG;    
    if (screenWidth >= WIDTHBIGSCR) {                        
        maxLength = LENGTHBIG + counterMoreClick * 3;        
    } else if (screenWidth < WIDTHSMALLSCR) {            
        maxLength = LENGTHSMALL + counterMoreClick;        
    } else {
        maxLength = LENGTHMIDDLE  + counterMoreClick * 2;        
    }

    const maxNum = allLength > maxLength ? maxLength : allLength;    
    return workArr.slice(0, maxNum);
};
