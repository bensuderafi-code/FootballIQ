const key=process.env.API_FOOTBALL_KEY;
if(!key) throw new Error('Missing API_FOOTBALL_KEY secret');
const leagues=[[39,'Premier League'],[140,'LaLiga'],[135,'Serie A'],[78,'Bundesliga'],[61,'Ligue 1'],[2,'Champions League'],[253,'MLS'],[71,'Brasileirão'],[262,'Liga MX']];
const today=new Date(),from=today.toISOString().slice(0,10),end=new Date(today.getTime()+14*86400000).toISOString().slice(0,10),all=[];
for(const [league,name] of leagues){
 const url=new URL('https://v3.football.api-sports.io/fixtures');
 url.search=new URLSearchParams({league:String(league),season:'2026',from,to:end,timezone:'Africa/Kampala'});
 const response=await fetch(url,{headers:{'x-apisports-key':key}});
 if(!response.ok) throw new Error('API-Sports request failed for '+name+': '+response.status);
 const body=await response.json();
 if(body.errors&&Object.keys(body.errors).length) throw new Error(JSON.stringify(body.errors));
 for(const item of body.response||[]){
  const status=item.fixture.status.short;
  all.push({id:'api-'+item.fixture.id,providerId:item.fixture.id,league:name,date:item.fixture.date,home:item.teams.home.name,away:item.teams.away.name,hxg:1.35,axg:1.15,status:['FT','AET','PEN'].includes(status)?'FINISHED':'UPCOMING',homeScore:item.goals.home,awayScore:item.goals.away,statusShort:status,dataSource:'API-Sports'});
 }
}
all.sort((a,b)=>new Date(a.date)-new Date(b.date));
const fs=await import('node:fs/promises');await fs.mkdir('public/data',{recursive:true});await fs.writeFile('public/data/fixtures.json',JSON.stringify(all,null,2)+'\n');
console.log('Wrote '+all.length+' fixtures from API-Sports ('+from+' to '+end+').');
