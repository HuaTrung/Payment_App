export const formatCurrency  = (n, seperate = ",") => {
  let s = n.toString();
  let regex = /\B(?=(\d{3})+(?!\d))/g;
  let ret = s.replace(regex,seperate);
  return ret;
}