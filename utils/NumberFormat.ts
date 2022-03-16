/**
 * Format số bất kỳ
 * @param {number} amount Số cần format
 * @param {number} decimalCount Phần thập phân
 * @param {string} decimal ngăn cách phần thập phân
 * @param {string} thousands ngăn cách phần ngàn
 */
function NumberFormat(
  amount: number,
  decimalCount: number = 0,
  decimal: string = ".",
  thousands: string = ","
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      //@ts-ignore
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal + //@ts-ignore
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}

export default NumberFormat;
