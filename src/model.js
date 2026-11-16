// Transparent Poisson model. Inputs are illustrative until connected to a documented live data provider.
export const poisson = (lambda, k) => Math.exp(-lambda) * Math.pow(lambda, k) / factorial(k);
const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);
export function forecast(homeXg, awayXg) {
  const grid = Array.from({length: 9}, (_,h)=>Array.from({length:9},(_,a)=>poisson(homeXg,h)*poisson(awayXg,a)));
  let home=0, draw=0, away=0, over25=0, btts=0;
  const scores=[];
  grid.forEach((row,h)=>row.forEach((p,a)=>{
    if(h>a) home+=p; else if(h===a) draw+=p; else away+=p;
    if(h+a>=3) over25+=p;
    if(h>0&&a>0) btts+=p;
    scores.push({score:`${h}-${a}`,p});
  }));
  scores.sort((x,y)=>y.p-x.p);
  return {home,draw,away,over25,btts,scores:scores.slice(0,5),grid};
}
export function brier(pred, outcome) {
  return pred.reduce((sum,p,i)=>sum+Math.pow(p-(i===outcome?1:0),2),0)/pred.length;
}
export function rps(pred, outcome) {
  let total=0;
  for(let i=0;i<2;i++){const cp=pred.slice(0,i+1).reduce((a,b)=>a+b,0);const actual=outcome<=i?1:0;total+=Math.pow(cp-actual,2);}
  return total/2;
}