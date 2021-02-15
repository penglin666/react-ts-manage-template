import{createStore} from 'redux';
const store=createStore((state:any={
  currentLocation:''//当前页面位置
},action:any)=>{
  switch(action.type){
    case 'changeLocation':
      return {
        currentLocation:action.curLocation
      }
    default:
      return state
  }
})
export const changeLocation=(item:string)=>({
  type:'changeLocation',
  curLocation:item
})
export default store