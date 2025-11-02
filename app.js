// js file added

// let a = [1,2,3,4,5,2,6]
// let a = [1,2,3,4,5,4,3,2,1]


// function reverse(nums){
// let i = 0;
// let j = nums.length-1;
// let temp ;
// if(i<j){
//     temp =nums[i];
//     nums[i]=nums[j];
//     nums[j]=temp;
//     i++;
//     j--;
// }
// console.log(a)

// }

// function reverse(nums){
// let i = 0;
// let j = nums.length-1;
// let temp ;
// if(nums[i]!=nums[j]){
//     temp =nums[i];
//     nums[j]=nums[i];
//     nums[i]=nums[j]
//     i++;
//     j--;
//     return false;
// }
// console.log(a)
// return false

// }
// console.log(a);

// reverse(a);

let a= [3,6,8,12,15,17,18];
let b = [1,4,9,16];
let newarr=[];

function sortarr(nums1,nums2){
    let i=0;
    let j=0;
    while (i<nums1.length&&j<nums2.length) {
        if(nums1[i]<=nums2[j]){
         newarr.push(nums1[i])
         i++
        } else{
            newarr.push(nums2[j]);
            j++
        }

        
    }

    while (i<nums1.length) {
        newarr.push(nums1[i]);
        i++
    }

    while(j<nums2.length){
  newarr.push(nums2[j])
  j++
    }

    console.log(newarr);
}
sortarr(a,b);