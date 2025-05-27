class NumberUtils {
    /**
     * Round a number to the nearest 0.5
     * @param num the number to round
     * @returns the rounded number (e.g. 4.5, 4)
     */
    public static roundToNearestHalf(num: number): number {
        if (num === undefined || typeof num !== 'number' || isNaN(num)) {
            throw new Error('Input must be a valid number');
            //return 0.
        }
        return Math.round(num * 2) / 2;
    }

    /**
     * Rounds a number to nearest 0.5 and formats as string with .0 for whole numbers
     * @param num The number to round and format
     * @returns Formatted string (e.g. "4.0", "4.5")
     */
    public static roundAndFormatToHalf(num:number):string {
        const rounded = this.roundToNearestHalf(num);

        return rounded%1===0?rounded.toFixed(1):rounded.toString();
    }
    
    /**
     * Rounds a number to nearest 0.5 and returns a number with decimal
     * @param num The number to round
     * @returns Number with .0 if whole number (e.g. 4.0, 4.5)
     */
    public static roundedToHalfWithDecimal(num:number):number{
        return parseFloat( this.roundToNearestHalf(num).toFixed(1));
    }

    public static roundToHalf(num:number, options: RoundedOptions={}) : number | string{
        const rounded = this.roundToNearestHalf(num);

        if(options.forceDecimal){
            return parseFloat(rounded.toFixed(1));
        }

        if(options.formatAsString){
            return rounded%1===0?rounded.toFixed(1):rounded.toString();
        }

        return rounded;
    }
}

interface RoundedOptions {
    formatAsString?:boolean;
    forceDecimal?:boolean;
}

export default NumberUtils;