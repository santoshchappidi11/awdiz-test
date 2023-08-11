// const nums = [2, 7, 11, 15];
// const target = 9;

const nums = [3,2,4];
const target = 6

// const nums = [3,3];
// target = 6

const findTarget = (nums, target) => {
  for (let i = 0; i <= nums.length - 1; i++) {
    for (let j = i + 1; j <= nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        console.log(`${nums[i] + nums[j]}`);
      }
    }
  }
};

findTarget(nums, target);
