let arr =[5,6,2,1,0];

console.log(arr.reduce((acc,curr)=>{
    console.log(acc)
    return acc>curr?curr:acc
},arr[0]))