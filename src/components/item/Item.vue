<template>
    <div class="item">
        <div class="thumb" @click="onClick">
            <img :src="item.itemImgPath" @error="imgLoadError" v-if="!isError">
            <v-icon v-if="isError" name="package"></v-icon>
        </div>
        <div class="desc" @click="onClick">
            <div class="text">
                <span class="name">{{ item.itemName | filterName }}</span>
                <span :class="[{'blue-badge':isPublic}, badgeClass]">{{item.visibleTo|filterVisible}}</span>
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
        <div id="snackbar"><span style="color:#0EC99C">'{{ item.itemName }}'</span>의<br> 링크가 복사되었습니다!<br><span style="color:#49B7F5">친구와 공유해보세요!</span></div>
    </div>
</template>
<script>
import store from '../../store';
const { dispatch, state } = store;
export default {
    name: 'Item',
    props: ['item'],
    computed:{
        getType(){
            if(this.item.purchasedBy == ''){
                return '완료'
            }
            return '복구'
        },
        isPublic(){
            if(this.item.visibleTo == 'public'){
                return true;
            }
            return false;
        },
    },
    data(){
        return{
            isError: false,
            badgeClass: 'badge',
        }
    },
    methods:{
        onCopy(){
            //toast
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
            navigator.clipboard.writeText(this.$url+'/item/othersDetail/'+this.item._id);
        },
        onEdit(){
            this.$router.push({name:'itemModify', params:{itemId:this.item._id}});
        },
        onRemove(){
            dispatch('removeItem', this.item);
            this.$emit('onChange');
        },
        onToggle(){
            if(this.getType == '완료'){
                this.item.purchasedBy = state.userId;
            }else if(this.getType == '복구'){
                this.item.purchasedBy = '';
            }
            dispatch('handleToggle', this.item);
            this.$emit('onChange');
        },
        imgLoadError(){
            // this.item.itemImgPath='/assets/images/data_usage.svg';
            this.isError = true;
        },
        onClick(){
            this.$emit('onClick', this.item);
        },
        
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
            return '비공개';
        },
        filterPrice(val){
            if(val==null){
                return '-'
            }
            return val;
        },
        filterVisible(val){
            if(val=='public'){
                return '공개'
            }else{
                return '비공개'
            }
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
    padding: 1.2rem 0.2rem 1.2rem 1.5rem;
    margin-bottom: 0.5rem;
    font-family: $font-stack;
    &:hover, &:active{
        background-color: rgba(100, 100, 100, 0.05);
        border-radius: 10px;
    }
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
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 15px;
    }
    svg{
        width: 2rem;
        height: 2rem;
        color: $dark-gray;
        fill: transparent;
    }
}
.badge{
    margin-left: 0.5rem;
    border-radius: 9px;
    display: inline-flex;
    height: 2rem;
    display:inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color : $margenta;
    border: 1px solid $margenta;
    background: transparent;

}
.blue-badge{
    color : $green;
    border: 1px solid $green;
    background: transparent;
    display:inline-flex;
    align-items: center;
    justify-content: center;
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
.dropdown a{
    @include flex-center();
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
        cursor: pointer;
        &:hover, &:active{
            background-color: transparent;
            color: $green;
        }
    }
}
/* The snackbar - position it at the bottom and in the middle of the screen */
#snackbar {
  visibility: hidden; /* Hidden by default. Visible on click */
//   min-width: 250px; /* Set a default minimum width */
  width: 25rem;
  background-color: #333; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 10px; /* Rounded borders */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  left: 50%; /* Center the snackbar */
  transform: translateX(-50%);
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