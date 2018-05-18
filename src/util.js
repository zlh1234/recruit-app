

export function getRedirectPath({type,avatar}){
  //type genius--牛人，boss--BOSS
  //avatar geniusinfo / bossinfo
  let url = (type==='genius') ? '/genius' : '/boss'
  if(!avatar){
    url+='info';
  }
  return url
}

export function getChatId(userid,target){
  return [userid,target].sort().join('_');
}
