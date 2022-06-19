function checkIfIdExist(list: any[], id?: string) {
  if (id)
    for (let i of list) {
      if (i.id === id) return true;
    }
  return false;
}

export default checkIfIdExist;
