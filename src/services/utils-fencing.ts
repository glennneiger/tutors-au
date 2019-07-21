interface Fence {
  top: number,
  bottom: number
}


export function adjustForFencing(md: string, index: number, position: string) {
  let fences = fencedMarkdown(md);
  if(fences != undefined || fences.length == 0) {
    return index; // incoming string md not fenced.
  }
  let adjustedIndex: number = index;
  let fence = isFenced(index, fences) 
  if(position == 'top') {
    adjustedIndex = fence.top - 1;
  } else if (position == 'bottom') {
    adjustedIndex = fence.bottom + 1;
  }
  return adjustedIndex;
}

function fencedMarkdown(md: string) {
  let fence: string = '~~~';
  let fences = indicesFenced(md, md.length, fence);
  console.log(fences);
  return fences;
}

function indicesFenced(md: string, endIndx: number, fence: string, fenced = []) : number [] {
  let indxOf = md.indexOf(fence);
  if(indxOf == -1) 
    return fenced;
  let currentFenceIndx = indxOf + (fenced.length > 0 ? fenced[fenced.length -1] + fence.length : 0);
  fenced.push(currentFenceIndx);

  let nextSubStr = md.substring(indxOf + fence.length, endIndx);
  return indicesFenced(nextSubStr, endIndx, fence, fenced);
}

/**
 * If index within fencing return Fence object.
 * else return null.
 * @param index Check if within fencing.
 * @param fences The array of fence indices.
 */
function isFenced(index: number, fences) : Fence {
  for (let i = 0; i < fences.length; i += 1) {
    if(index >= fences[i].top && index <= fences[i].bottom) {
      return {top: fences[i].top, bottom: fences[i].bottom};
    }
  }
  return null;
}


// function fenceTuples(fenceIndices: number[]) {
//   let pairs = [];
//   for (let i = 0; i < fenceIndices.length; i += 2) {
//     pairs.push({top: fenceIndices[i], bottom: fenceIndices[i+1]});
//   }
//   return pairs;
// }
