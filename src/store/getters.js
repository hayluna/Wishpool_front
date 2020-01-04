export default {
    isLoggedIn : state => !!state.token,
    myAllItemList : state => state.myAllItemList,
    myItemList: state => state.myAllItemList.filter(item => item.purchasedBy == ''),
    myDoneList: state => state.myAllItemList.filter(item => item.purchasedBy != ''),
    myFollowers : state => state.myProfile.followerId, //id배열 아닌 객체배열임(populated된)
    myFollowings: state => state.myProfile.followingId, //id배열 아닌 객체배열임(populated된)
    myProfile : state => state.myProfile,
    searchUserList : state => state.searchUserList
}
