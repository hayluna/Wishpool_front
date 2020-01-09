export default {
    isLoggedIn : state => (state.status=="success"),
    authStatus: state => state.status,
    myAllItemList : state => state.myAllItemList,
    myItemList: state => state.myAllItemList.filter(item => item.purchasedBy == ''),
    myDoneList: state => state.myAllItemList.filter(item => item.purchasedBy != ''),
    othersAllItemList: state => state.othersAllItemList,
    othersItemList: state => state.othersAllItemList.filter(item => item.purchasedBy == ''),
    othersDoneList: state => state.othersAllItemList.filter(item => item.purchasedBy != ''),
    myFollowers : state => state.myProfile.followerId, //id배열 아닌 객체배열임(populated된)
    myFollowings: state => state.myProfile.followingId, //id배열 아닌 객체배열임(populated된)
    myProfile : state => state.myProfile,
    getCurrentUser : state => state.currentUser,
    searchUserList : state => state.searchUserList,
    tab1: state => state.tab1,
    tab2: state => state.tab2,
    tab3: state => state.tab3,
    tab4: state => state.tab4,
}
