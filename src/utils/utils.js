// 公用函数
const bl=(num)=>{
    return num < 10 ? "0" + num : num;
}

export const getuserlist=(time)=>{
    const date=new Date(time)
    return  time=date.getFullYear()+'-'+bl(date.getMonth() + 1)+ "-"+bl(date.getDate())+' '+bl(date.getHours())+':'+bl(date.getMinutes())+':'+bl(date.getSeconds())
}