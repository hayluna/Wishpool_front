<template>
    <div class="item">
        <div class="thumb">
            <img :src="item.itemImgPath" @error="imgLoadError">
        </div>
        <div class="desc">
            <div class="text">
                <span class="name">{{ item.itemName | filterName }}</span>
                <span class="badge">{{ item.visibleTo | filterBadge }}</span>
            </div>
            <span class="price">{{ item.itemPrice | filterPrice }}원</span>
        </div>
        <div class="dropdown">
            <a data-toggle="dropdown">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
            </a>
            <ul class="dropdown-menu" role="menu">
                <li role="presentation"><a role="menuitem" tabindex="-1" @click="onCopy">복사</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" @click="onEdit">수정</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" @click="onRemove">삭제</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" @click="onToggle">{{ getType }}</a></li>
            </ul>
        </div>
        <div id="snackbar">{{ item.itemName }}의 링크가 복사되었습니다!<br>친구와 공유해보세요!</div>
    </div>
</template>
<script>
import store from '../../store';
const { dispatch } = store;
export default {
    name: 'Item',
    props: ['item'],
    computed:{
        getType(){
            if(this.item.purchasedBy == ''){
                return '완료'
            }
            return '복구'
        }
    },
    data(){
        return{
            isError: true
        }
    },
    methods:{
        onCopy(){
            //url copy
            navigator.clipboard.writeText(this.$url+'/item/detail/'+this.item._id);
            //toast
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
            navigator.clipboard.writeText(this.$url+'/item/detail/'+this.item._id);
        },
        onEdit(){
            this.$router.push({name:'itemModify', params:{itemId:this.item._id}});
        },
        onRemove(){
            dispatch('removeItem', this.item);
        },
        onToggle(){
            if(this.getType == '완료'){
                this.item.purchasedBy = 'MYSELF';
            }else if(this.getType == '복구'){
                this.item.purchasedBy = '';
            }
            dispatch('handleToggle', this.item);
        },
        imgLoadError(){
            this.item.itemImgPath='/assets/images/data_usage.svg';
        }
    },
    filters:{
        filterName(val){
            if(val.length >13){
                return val.substr(0, 13)+'...';
            }
            return val;
        },
        filterBadge(val){
            if(val == 'private'){
                return '비공개';
            }else if(val == 'public'){
                return '공개';
            }
        },
        filterPrice(val){
            if(val==null){
                return '-'
            }
            return val;
        },
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
.item{
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid lightgray;
    padding: 2rem 0.2rem 2rem 1.5rem;
}
.desc{
    flex:1;
    margin-top: 0.5rem;
    margin-left: 1.5rem;
    height: 100%;
    align-self: flex-start;
    font-weight: bold;
}
.thumb{
    width: 4.5rem;
    height: 4.5rem;
    justify-self: flex-start;
    border-radius: 15px;
    border: 1px solid lightgray;
    @include flex-center();
    img{
        width: 95%;
        height: 95%;
        object-fit: cover;
        border-radius: 10px;
    }
}
.badge{
    margin-left: 0.5rem;
    border: 1px solid #A9AAB9;
    border-radius: 8px;
    background: transparent;
    color: #A9AAB9;
    font-size: 0.8rem;
    padding-right: 0.4rem;
    padding-left: 0.4rem;
}
svg{
    justify-self: flex-end;
    fill: #BEBEBE;
    cursor: pointer;
}
.price{
    color: #A9AAB9;
    font-size: 1.2rem;
    font-weight: normal;
}
.dropdown-menu{
    left: unset;
    right: 0;
    background-color: rgba(51,51,51,0.8);
    border-radius: 10px;
    min-width: 5rem;
    a{
        color: white;
        width: fit-content;
        &:hover, &:active{
            background-color: transparent;
            color: $green;
        }
    }
}
/* The snackbar - position it at the bottom and in the middle of the screen */
#snackbar {
  visibility: hidden; /* Hidden by default. Visible on click */
  min-width: 250px; /* Set a default minimum width */
  margin-left: -125px; /* Divide value of min-width by 2 */
  background-color: #333; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 10px; /* Rounded borders */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  left: 50%; /* Center the snackbar */
  bottom: 10rem; /* 30px from the bottom */
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
  visibility: visible; /* Show the snackbar */
  -webkit-animation: fadein 1s, fadeout 0.8s 1.3s; //fadeout합과 setTimeout시간과 일치시켜야한다. 합쳐서 2s여야하는데, 막상 2s하면 잔상이 남음. delay시간을 0.1s더 잡아주면 됨.
  animation: fadein 1s, fadeout 0.8s 1.3s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {bottom: 10rem; opacity: 0;}
  to {bottom: 10rem; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 10rem; opacity: 0;}
  to {bottom: 10rem; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 10rem; opacity: 1;}
  to {bottom: 10rem; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 10rem; opacity: 1;}
  to {bottom: 10rem; opacity: 0;}
}
</style>