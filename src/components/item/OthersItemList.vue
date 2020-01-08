<template>
    <div class="view"> 
        <div class="fix-top">
            <div class="header">
            <div class="nav">
                <div class="back" @click="onBack">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"/></svg>
                </div>
            </div>
            <div class="title">위시리스트</div>
            <div class="empty"></div>
        </div>
            <ul class="nav nav-tabs nav-tabs-wide">
                <li class="active"><a href="#wish" data-toggle="tab">아이템</a></li>
                <li><a href="#done" data-toggle="tab">완료</a></li>
            </ul>
        </div>
        <div class="tab-content">
            <!-- 아이템 목록 -->
            <div class="tab-pane active" id="wish">
                <ul class="ul-item">
                    <li v-for="item in wishItems" :key="item._id">
                        <item 
                        :item="item"
                        @onClick="handleClick" />
                    </li>
                </ul>
            </div>
            <!-- 완료 목록 -->
            <div class="tab-pane" id="done">
                <ul class="ul-item">
                     <li v-for="item in doneWishItems" :key="item._id">
                        <item 
                        :item="item"
                        @onClick="handleClick" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import store from '../../store';
const { getters, dispatch } = store;
import OthersItem from './OthersItem.vue';
export default {
    name: 'OthersItemList',
    components: {
        'item' : OthersItem,
    },
    computed:{
        wishItems(){
            return getters.othersItemList;
        },
        doneWishItems(){
            return getters.othersDoneList;
        },
    },
    beforeRouteEnter(to, from, next){
        dispatch('pending');
        dispatch('fetchOthersItemList', to.params.userId);
        store.watch(
            (state, getters) => state.loading,
            (newValue, oldValue) =>{
                if(newValue == false){
                    next();
                }
            }
        )
    },
    created(){
        // this.items = getters.myAllItemList;
    },
    methods:{
        handleClick(item){
            this.$router.push({name:'othersItemDetail', params:{itemId: item._id}});
        },
        onBack(){
            this.$router.go(-1);
        },
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    .view{
        background: white;
        height: 100%;
        overflow: hidden;
        font-family: $font-stack;
    }
    .fix-top{
        position: fixed;
        width: 100%;
        background: white;
        z-index: 4;
    }
    .header{
        display: flex;
        align-items: center;
        background: white;
        padding: 0.2rem 1.7rem 0 1.7rem;
        height: 5rem;
        box-shadow: 0px 3px 6px lightgray;
        z-index: 3;
    }
    .nav{
        flex:1;
        padding-top: 0.2rem;
    }
    .back{
        border: 1px solid $dark-gray;
        border-radius: 5px;
        width: 2.5rem;
        height: 2.5rem;
    }
    .empty{
        flex:1;
    }
    .title{
        flex:1;
        text-align: center;
        font-weight: bolder;
        font-size: 1.6rem;
    }
    .add-button{
        @include flex-center();
        align-items: center;
        flex-direction: row;
        flex:1;
        justify-content: flex-end;
        font-size: 1rem;
        cursor: pointer;
        .add-text{
            font-size: 1.4rem;
            margin-right: 5px;
            color: #3a404a;
        }
        .plus-button{
            border-radius: 100%;
            width:2rem;
            height:2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0px 3px 5px lightgray;
            margin-left: 0.2rem;
            fill: #999ca3;
        }
    }
    .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
        color: #555;
        cursor: default;
    }
    .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #555;
    }
    .nav-tabs-wide{
        width: 100%;
        border: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 6rem;
        padding: 0 1.5rem 0 1.5rem;
        li{
            border: none;
            width: 100%;
            text-align: center;
            border-bottom: 1px solid #E7E7EB;
            
        }
        a{
            color: black;
            padding: 1rem 1rem 1.5rem 1rem;
        }
    }
    .ul-item{
        margin-top: 10rem;
        margin-bottom: 10rem;
        padding: 0 1.5rem 0 1.5rem;
        li{
            list-style: none;
        }
    }
    /* The side navigation menu */
    .sidenav {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 10; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #fff; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    }

    /* Position and style the close button (top right corner) */
    .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
    padding-left: 5rem;
    }
    
    /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
    #main {
    transition: margin-left .5s;
    padding: 20px;
    }

    /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
    @media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
    }
    @media (min-width:420px){
        .fix-top{
            width: 50rem;
        }
        .header{
            height: 6rem;
            padding: 0 1.5rem 0 1.5rem;
        }
        .title{
            font-size: 2rem;
        }
        .nav-tabs-wide{
            font-size: 1.5rem;
        }
        .add-button .add-text{
            font-size: 1.7rem;
        }
    }
</style>