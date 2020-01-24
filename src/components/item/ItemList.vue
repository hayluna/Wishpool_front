<template>
    <div class="view"> 
        <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" style="font-size:2.5rem; color:black;" @click="closeNav">&times;</a>
            <div style="padding-left: 4rem; margin-top: 2rem;">
                <p style="font-weight:bold; font-size:1.5rem;color:transparent;">위시리스트</h4>
                <p style="margin-bottom:0;color:transparent;">총 금액</p>
                <p style="color:transparent; font-weight:bold; font-size:1.5rem;">
                    <span class="total-price">{{ wishTotal }}원</span></p>
            </div>
            <div style="padding-left: 4rem; margin-top: 2rem;">
                <p style="font-weight:bold; font-size:1.5rem;color:transparent;">완료리스트</p>
                <p style="margin-bottom:0;color:transparent;">총 금액</p>
                <p style="color:transparent; font-weight:bold; font-size:1.5rem;">
                    <span class="total-price">{{ doneWishTotal }}원</span></p>
            </div>
        </div>
        <div class="fix-top">
            <div class="header">
                <div class="nav" @click="openNav">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14">
                    <g id="구성_요소_5_1" data-name="구성 요소 5 – 1" transform="translate(1 1)">
                        <line id="선_22" data-name="선 22" x2="8" fill="none" stroke="#3a404a" stroke-linecap="round" stroke-width="2"/>
                        <line id="선_23" data-name="선 23" x2="15" transform="translate(0 6)" fill="none" stroke="#3a404a" stroke-linecap="round" stroke-width="2"/>
                        <line id="선_24" data-name="선 24" x2="12" transform="translate(0 12)" fill="none" stroke="#3a404a" stroke-linecap="round" stroke-width="2"/>
                    </g>
                    </svg>
                </div>
                <div class="title">내 위시리스트</div>
                <div class="add-button" @click="onInsert">
                    <!-- <span class="add-text">추가</span> -->
                    <div class="plus-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>
                    </div>
                </div>
            </div>
            <ul class="nav nav-tabs nav-tabs-wide">
                <li class="active"><a href="#wish" data-toggle="tab">아이템</a></li>
                <li><a href="#done" data-toggle="tab">완료</a></li>
            </ul>
        </div>
        <div class="tab-content">
            <!-- 아이템 목록 -->
            <div class="tab-pane active" id="wish">
                <ul class="ul-item" v-if="!isWishEmpty">
                    <li v-for="item in wishItems" :key="item._id">
                        <item 
                        :item="item"
                        @onClick="handleClick"
                        @onChange="completeSnackbar" />
                    </li>
                </ul>
                <div v-if="isWishEmpty" class="empty-list">
                    <div class="person"><v-icon name="edit-3"></v-icon></div>
                    <br>아직 추가된 아이템이 없네요!
                </div>
            </div>
            <!-- 완료 목록 -->
            <div class="tab-pane" id="done">
                <ul class="ul-item" v-if="!isDoneEmpty">
                     <li v-for="item in doneWishItems" :key="item._id">
                        <item 
                        :item="item"
                        @onClick="handleClick"
                        @onChange="completeSnackbar" />
                    </li>
                </ul>
                <div v-if="isDoneEmpty" class="empty-list">
                    <div class="person"><v-icon name="shopping-bag"></v-icon></div>
                    <br>아직 완료된 아이템이 없네요!
                </div>
            </div>
        </div>
        <complete-snackbar />
    </div>
</template>
<script>
import store from '../../store';
const { getters, dispatch } = store;
import Item from './Item.vue';
import CompleteSnackbar from '../CompleteSnackbar.vue'
export default {
    name: 'ItemList',
    components: {
        'item' : Item,
         'complete-snackbar' : CompleteSnackbar
    },
    computed:{
        items(){
            return getters.myAllItemList;
        },
        wishItems(){
            return getters.myItemList;
        },
        doneWishItems(){
            return getters.myDoneList;
        },
        wishTotal(){
            let total = 0;
            this.items.forEach(item => {
                if(item.itemPrice && item.purchasedBy == ''){
                    total += parseInt(item.itemPrice, 10);
                }
            });
            return total;
        },
        doneWishTotal(){
            let total = 0;
            this.items.forEach(item => {
                if(item.itemPrice && item.purchasedBy != ''){
                    total += parseInt(item.itemPrice, 10);
                }
            });
            return total;
        },
        isWishEmpty(){
            if(this.wishItems.length==0){
                return true;
            }
            return false;
        },
        isDoneEmpty(){
            if(this.doneWishItems.length==0){
                return true;
            }
            return false;
        },
    },
    beforeRouteEnter(to, from, next){
        //비동기로 itemlist전부를 가져온다.
        dispatch('fetchMyAllItemList');
        //loading==false가 될 때 라우터 이동을 허용한다.
        store.watch(
            (state, getters) => state.loading,
            (newValue, oldValue) =>{
                if(newValue == false){
                    next();
                }
            }
        )
    },
    mounted(){
        var self = this;
        this.$bus.$on('completeSnackbar', function(){
            setTimeout(function(){
            self.completeSnackbar();
            }, 200);
        })
    },
    methods:{
        onInsert(){
            this.$router.push({name:'itemInsert'})
        },
        handleClick(item){
            this.$router.push({name:'itemDetail', params:{itemId: item._id}});
        },
        openNav(){
            document.getElementById("mySidenav").style.width = "20rem";
            setTimeout(function(){
                document.getElementById("mySidenav").children[1].children[0].style.color="black"
                document.getElementById("mySidenav").children[1].children[1].style.color="black"
                document.getElementById("mySidenav").children[1].children[2].style.color="gray"
                document.getElementById("mySidenav").children[1].children[2].children[0].style.color="#0EC99C"
                document.getElementById("mySidenav").children[2].children[0].style.color="black"
                document.getElementById("mySidenav").children[2].children[1].style.color="black"
                document.getElementById("mySidenav").children[2].children[2].style.color="gray"
                document.getElementById("mySidenav").children[2].children[2].children[0].style.color="#0EC99C"
            }, 200)
            
        },
        closeNav(){
            document.getElementById("mySidenav").children[1].children[0].style.color="transparent"
            document.getElementById("mySidenav").children[1].children[1].style.color="transparent"
            document.getElementById("mySidenav").children[1].children[2].style.color="transparent"
            document.getElementById("mySidenav").children[1].children[2].children[0].style.color="transparent"
            document.getElementById("mySidenav").children[2].children[0].style.color="transparent"
            document.getElementById("mySidenav").children[2].children[1].style.color="transparent"
            document.getElementById("mySidenav").children[2].children[2].style.color="transparent"
            document.getElementById("mySidenav").children[2].children[2].children[0].style.color="transparent"
            document.getElementById("mySidenav").style.width = "0";
        },
         completeSnackbar(){
            var x = document.getElementById("complete");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
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
        position: fixed; 
        width:100%; 
        top:0; 
        left:0;
    }
    #mySidenav{
        box-shadow: 0px 3px 6px lightgray;
        z-index: 2000;
    }
    .fix-top{
        -webkit-backface-visibility: hidden;
        position: absolute;
        top:0;
        left:0;
        width:100%;
        z-index:10;
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
        cursor: pointer;
    }
    .title{
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
            &:hover{
                color: black;
            }
            &:active{
                font-weight: 800;
            }
        }
        .plus-button{
            border-radius: 100%;
            width:2.3rem;
            height:2.3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid black;
            margin-right: 0.5rem;
            fill: black;
            &:hover{
                    border-color: $green;
                svg{
                    fill: $green;
                }
            }
            &:active{
                    border-color: $red;
                svg{
                    fill: $red;
                }
            }
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
        height: 5.8rem;
        padding: 0 1.5rem 0 1.5rem;
        background: white;
        li{
            border: none;
            width: 100%;
            text-align: center;
            border-bottom: 1px solid #E7E7EB;
            height: 100%;
        }
        a{
            color: black;
            height: 100%;
            @include flex-center();
        }
    }
    .total-price{
        color:transparent;
        font-size: 1.7rem;
    }
    .ul-item{
        margin-top: 12rem;
        margin-bottom: 10rem;
        padding: 0 1.5rem 0 1.5rem;
        li{
            list-style: none;
            cursor: pointer;
            padding:0;
            border-bottom: 1px solid lightgray;
        }
    }
    .tab-content, .tab-pane{
        width: 100%;
        height: 100%;
        z-index: 1; 
        overflow-y: scroll; 
        -webkit-overflow-scrolling: touch;
        padding-bottom: 3rem;
    }
    
    .empty-list{
        width: 100%;
        height: 100%;
        @include flex-center();
        font-size: 1.5rem;
        text-align: center;
        padding-top: 8rem;
    }
    .person{
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 100%;
        background: $green;
        @include flex-center();
        svg{
            color:white;
            width: 2.2rem;
            height: 2.2rem;
            @include flex-center();
        }
        
    }
    a:focus, a:hover {
        text-decoration: none;
        cursor: pointer;
    }
    /* The side navigation menu */
    .sidenav {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 20; /* Stay on top */
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
        top: 10px;
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
   @media (min-width:450px){
        .header{
            height: 5.5rem;
            padding: 0 1.5rem 0 1.5rem;
        }
        .title{
            font-size: 1.7rem;
        }
        .nav-tabs-wide{
            font-size: 1.5rem;
        }
        .add-button .add-text{
            font-size: 1.5rem;
        }
    }
</style>