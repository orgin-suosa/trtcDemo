<template>
  <div>
    <div id="local_stream"></div>
    <div v-show="isRetome" id="remote_stream"></div>

    <el-button type="primary" @click="getScreenSharing">屏幕分享</el-button>
      <el-button type="primary" @click="Camera">列表</el-button>
    <el-button type="danger" @click="stop">停止</el-button>
        <el-button type="player" @click="getRemoteVideoStat">订阅信息</el-button>
  </div>
</template>




<script>
export default {
  data() {
    return {
      userInfo: {
        userid: "",
        userSig: "",
        roomid: ""
      },
      isRetome: false,

      clientTrtc: {},
      localStreams: {}
    };
  },
  created() {
    this.userInfo = this.$route.params.userInfo;
    let sdkAppId = 1400472663;
    let userId = this.userInfo.userid;
    let roomid = this.userInfo.roomid;
    let userSig = this.userInfo.userSig;
    let streamId = "1400472663";
    console.log("userInfo--1", this.userInfo.userid);
    console.log("userInfo--2", this.userInfo.userSig);
    console.log("userInfo--3", this.userInfo.roomid);

    let client = TRTC.createClient({
      mode: "videoCall",
      sdkAppId,
      userId,
      userSig,
      streamId
    });
    console.log("client---->" + client);
    this.clientTrtc = client;
    this.initListener(client);
    this.jojn(client);
    this.getRemoteVideoStat(client);

  },
  methods: {
    initListener(client) {
      let that = this;
      client.on("stream-added", event => {
        const remoteStream = event.stream;
        console.log(
          "远端流增加: " + remoteStream.getId() + "--------->" + remoteStream
        );
        //订阅远端流
        client.subscribe(remoteStream);
      });
      client.on("stream-subscribed", event => {
        const remoteStream = event.stream;
        that.isRetome = true;
        console.log("远端流订阅成功：" + remoteStream.getId());
        console.log(
          "远端流订阅成功----->：" +
            remoteStream.getUserId() +
            "----type" +
            remoteStream.getType()
        );
        // 播放远端流
        remoteStream.play("remote_stream");
   
      });
      client.on("player-state-changed", event => {
        console.log("player-state-changed..........");
        console.log(revent.reason);
      });
      client.on("network-quality", event => {
        // console.log("网络变化回调 network-quality..........", event);
      });

      client.on("stream-updated", event => {
        const remoteStream1 = event.stream;
        console.log("stream-updated ..........", remoteStream1);
      });
      client.on("stream-removed", event => {
        const remoteStreamw = event.stream;
        that.isRetome = false;
        console.log("远端流移除---》stream-removed ..........", remoteStreamw);
      });
      client.on("peer-leave", event => {
        const peerleave = event.stream;
        console.log("peer-leave ..........", peerleave);
      });
    },
    jojn(client) {
      let roomid = this.userInfo.roomid;
      let that = this;
      client
        .join({ roomId: roomid })

        .catch(error => {
          console.error("进房失败 " + error);
        })
        .then(() => {
          console.log("进房成功");
          that.creatLocalStream(client);


        });


    },
    creatLocalStream(client) {
      let that = this;
      let localStream = TRTC.createStream({
        userId: that.userInfo.userid,
        audio: true,
        video: true
      });
      localStream.setVideoProfile("640p");
      this.localStreams = localStream;
      console.log("localStream....", localStream);
      this.localStreams
        .initialize()
        .catch(error => {
          console.error("初始化本地流失败 " + error);
        })
        .then(() => {
          console.log("初始化本地流成功");

          that.pushStream(client, this.localStreams);
        });
    },
    pushStream(client, localStream) {
      let that = this;
      client
        .publish(localStream)
        .catch(error => {
          console.error("本地流发布失败 " + error);
        })
        .then(() => {
          console.log("本地流发布成功");

          localStream.objectFit = "cover";
          localStream.play("local_stream", { objectFit: "contain" });
        });
    },

    getRemoteVideoStat(client){
      client.getRemoteVideoStats().then(stats => {
      for (let userId in stats) {
        console.log('userId: ' + userId +
                    ' bytesReceived: ' + stats[userId].bytesReceived +
                    ' packetsReceived: ' + stats[userId].packetsReceived +
                    ' packetsLost: ' + stats[userId].packetsLost +
                    ' framesDecoded: ' + stats[userId].framesDecoded +
                    ' frameWidth: ' + stats[userId].frameWidth +
                    ' frameHeight: ' + stats[userId].frameHeight);

      }
    });


    },
    stop() {
      let that = this;
      const videoTrack = this.localStreams.getVideoTrack();
      if (videoTrack) {
        this.localStreams.removeTrack(videoTrack).then(() => {
          // 关闭视频通话成功，停止videoTrack并释放摄像头资源
          videoTrack.stop();
          that.logout();
        });
      }
    },
    logout() {
      console.log("logout..........");
      this.clientTrtc
        .leave()
        .then(() => {
          // leaving room success
          console.log("leaving room success:........... ");
        })
        .catch(error => {
          console.log("leaving room failed: " + error);
        });
    },

    getScreenSharing() {
      console.log("点击事件触发。。。。................");
      var sdkAppId = "1400472663";
      var userId = "123";
      const streamId = 'share_123456';
      var userSig =
        "";
      var roomId = this.userInfo.roomid;
      var client = TRTC.createClient({
        mode: "rtc",
        sdkAppId,
        userId,
        streamId,
        userSig
      });

      client
        .join({ roomId })
        .catch(error => {
          console.error("进房失败 " + error);
        })
        .then(() => {
          // 创建屏幕分享流
          const localStream = TRTC.createStream({ audio: false, screen: true });
          // 监听屏幕分享停止事件
          localStream.on("screen-sharing-stopped", event => {
            console.log("屏幕分享停止--->screen sharing was stopped");
            client
              .leave()
              .then(() => {
                // leaving room success
                console.log(
                  "屏幕分享流停止---》leaving room success:........... "
                );
              })
              .catch(error => {
                console.log("leaving room failed: " + error);
              });
          });

          // 初始化屏幕分享流
          localStream.initialize().then(() => {
            console.log("screencast stream init success");
            // 发布屏幕分享流
            client.publish(localStream).then(() => {
              console.log("screen casting");
            });
          });
        });
    },
    Camera(){
      console.log("123")
      let cameras = null;
    TRTC.getCameras().then(devices => {
  cameras = devices;
  devices.forEach(dev => {
    console.log('camera label: ' + dev.label + ' deviceId: ' + dev.deviceId);
  });
});
    }

  }
};
</script>



<style scoped>
#local_stream {
  width: 200px;
  height: 200px;
}
#remote_stream {
  width: 200px;
  height: 200px;
}
</style>