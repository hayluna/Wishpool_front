export default {
    isLoggedIn : state => !!state.token,
    myAllItemList : state => state.myAllItemList,
    myFollowers : state => state.myFollowers,
    myFollowings: state => state.myFollowings,
    myProfile : state => state.myProfile,
}