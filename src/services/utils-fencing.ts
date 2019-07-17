function fencedMarkdown(md: string) {
  let fence: string = '~~~';
  let fences = indicesFenced(md, md.length, fence);
  console.log(fences);
  return fences;
}

interface Fence {
  top: number,
  bottom: number
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

function indicesFenced(md: string, endIndx: number, fence: string, fenced = []) : number [] {
  let indxOf = md.indexOf(fence);
  if(indxOf == -1) 
    return fenced;
  let currentFenceIndx = indxOf + (fenced.length > 0 ? fenced[fenced.length -1] + fence.length : 0);
  fenced.push(currentFenceIndx);

  let nextSubStr = md.substring(indxOf + fence.length, endIndx);
  return indicesFenced(nextSubStr, endIndx, fence, fenced);
}

function fenceTuples(fenceIndices: number[]) {
  let pairs = [];
  for (let i = 0; i < fenceIndices.length; i += 2) {
    pairs.push({top: fenceIndices[i], bottom: fenceIndices[i+1]});
  }
  return pairs;
}

export function adjustForFencing(md: string, index: number, position: string) {
  let adjustedIndex: number = index;
  let fences = fencedMarkdown(md);
  let fence = isFenced(index, fences) 
  if(fence != null) {
    if(position == 'start') {
      adjustedIndex = fence.top - 1;
    } else if (position == 'end') {
      adjustedIndex = fence.bottom + 1;
    }
  }
  return adjustedIndex;
}
