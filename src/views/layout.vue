<template>
    <div>
        <el-container style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;">
            <el-header class="d-flex align-items-center" style="background:#545c64">
                <a class="h5 text-light mb-0 mr-auto">{{$conf.logo}}</a>
                <el-menu
                    :default-active="navBar.active"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item :index="index | numToString" v-for="(item,index) in navBar.lists" :key="index">{{item.name}}</el-menu-item>
                    <el-submenu index="100">
                        <template slot="title">
                            <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                            summer
                        </template>
                        <el-menu-item index="100-1">修改</el-menu-item>
                        <el-menu-item index="100-2">退出</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-header>
            <el-container>
                <!-- 侧边栏 -->
                <el-aside width="200px" style="height:100%;">
                     <el-menu default-active="0" @select="slideSelect" style="height:100%;">
                        <el-menu-item :index="index | numToString" v-for="(item,index) in slideMeaus" :key="index">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <!-- 主布局 -->
                <el-main>
                    <div class="border-bottom mb-3" style="margin:-20px;padding:20px;" v-if="bran.length>0">
                        <!-- 面包屑 -->
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item v-for="(item,index) in bran" :key="index" :to="{ path: item.path }">
                            {{item.title}}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <!-- 主内容 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        
    </div>
</template>

<script>
    import common from '../common/mixins/mixins';
    export default {
        mixins:[common],
        data() {
            return {
                navBar:[],
                bran:[]
            }
        },
        created(){
            //初始化菜单
            this.navBar = this.$conf.navBar
            //获取面包屑
            this.getRouterBran();
            //初始化选中菜单
            this._initNavBar()
        },
        computed:{
            slideMeauActive:{
                get(){
					return this.navBar.lists[this.navBar.active].subActive || '0'
				},
				set(val){
                    this.navBar.lists[this.navBar.active].subActive = val
				}
            },
            slideMeaus(){
                return this.navBar.lists[this.navBar.active].subMeau || []
            }
        },
        watch:{
            '$route'(to,from){
                localStorage.setItem('navActive',JSON.stringify({
                    top:this.navBar.active,
                    left:this.slideMeauActive
                }))
                this.getRouterBran()
            }
        },
        methods: {
            _initNavBar(){
                let r = localStorage.getItem('navActive')
                if(r){
                    r = JSON.parse(r)
                    this.navBar.active = r.top
                    this.slideMeauActive = r.left
                }
            },
            //获取面包屑导航
            getRouterBran(){
                let b = this.$route.matched.filter(v=>v.name)
                let arr= []
                b.forEach((v,k) => {
                    if(v.name === 'index' || v.name === 'layout') return
                    arr.push({
                        name:v.name,
                        path:v.path,
                        title:v.meta.title
                    })
                });
                if(arr.length > 0){
                    arr.unshift({name:'index',path:'/index',title:'后台首页'})
                }
                this.bran = arr
            },
            handleSelect(key, keyPath) {
                this.navBar.active = key
                this.slideMeauActive = '0'
                if(this.slideMeaus.length>0){
                    this.$router.push({name:this.slideMeaus[this.slideMeauActive].pathname})
                }
            },
            slideSelect(key, keyPath) {
                this.slideMenuActive = key
                this.$router.push({name:this.slideMeaus[key].pathname})
            }
            
        }
    }
</script>

<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
   
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
   
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
   
  }
</style>