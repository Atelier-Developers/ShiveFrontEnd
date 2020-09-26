<template>
    <div class="my-3">
      <VideoPlayer/>
    </div>
  <!--  <div class="my-3">-->
<!--    <v-container>-->
<!--      <v-row justify="center">-->
<!--        <h1>کلاس‌های مجازی</h1>-->
<!--      </v-row>-->
<!--    </v-container>-->

<!--    <v-container>-->
<!--      <v-card class="mx-5 mx-sm-15" tile>-->
<!--        <v-card-title class="pr-10">-->
<!--          <v-icon right>content_copy</v-icon>-->
<!--          فایل‌های ارائه-->
<!--        </v-card-title>-->
<!--        <v-divider/>-->
<!--        <v-card-text class="text-center">-->
<!--          <v-container>-->
<!--            <v-row>-->
<!--              <v-col sm="6" md="4" lg="3" v-for="file in files" :key="file.id">-->
<!--                <FileTile :name="file.name" :type="file.type"/>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-container>-->
<!--        </v-card-text>-->
<!--      </v-card>-->
<!--    </v-container>-->
<!--    <v-container>-->
<!--      <v-card class="mx-5 mx-sm-15" tile>-->
<!--        <v-card-title class="pr-10">-->
<!--          توضیحات-->
<!--        </v-card-title>-->
<!--        <v-divider/>-->
<!--        <v-card-text>-->
<!--          سخنگوی وزارت امور خارجه کشورمان در پیامی طعنه‌آمیز اعلام کرد رئیس‌جمهور آمریکا روز گذشته به‌گونه‌ای در مجمع-->
<!--          عمومی سازمان ملل متحد سخنرانی کرده که گویی در یک تجمع انتخاباتی در کشورش مشغول سخنرانی بوده است!-->
<!--          به گزارش گروه بین‌الملل خبرگزاری تسنیم، سعید خطیب‌زاده سخنگوی وزارت امور خارجه جمهوری اسلامی ایران شامگاه-->
<!--          چهارشنبه در پیامی توئیتری اعلام کرد که دونالد ترامپ رئیس‌جمهور آمریکا در سخنرانی دیروز خود در هفتاد و پنجمین-->
<!--          مجمع عمومی سازمان ملل متحد، بار دیگر سازمان «ملل متحد» را با «ایالات متحده» اشتباه گرفته و همچون تجمعات-->
<!--          انتخاباتی به تعریف و تمجید از سیاست‌های شکست‌خورده دولت خود پرداخته است.-->

<!--        </v-card-text>-->
<!--      </v-card>-->
<!--    </v-container>-->

<!--    <v-container>-->
<!--      <v-card class="mx-5 mx-sm-15" tile>-->
<!--        <v-card-title class="pr-10">-->
<!--          <v-icon right>comment</v-icon>-->
<!--          نظرات-->
<!--        </v-card-title>-->
<!--        <v-divider/>-->
<!--        <v-card-text>-->
<!--          <v-container>-->
<!--            <v-card tile>-->
<!--              <v-card-title>-->
<!--                <h5>گورخر رنگین‌کمانی</h5>-->
<!--              </v-card-title>-->
<!--              <v-card-text>-->
<!--                خیلی ارائه کصشری بود خدایی خجالت نمیکشید این رو گذاشتید جلو استاد و سه ساعت کصوشر میبافید راجب بهش، خو یه گوسفند میذاشتید تو فیلم میرید واسمون بیشتر یاد میگرفتیم تا با این ارائه شما خو. کیرم تو سر و تهتون. اههه خدافظ.-->
<!--              </v-card-text>-->
<!--            </v-card>-->
<!--          </v-container>-->
<!--        </v-card-text>-->
<!--      </v-card>-->
<!--    </v-container>-->
<!--  </div>-->
</template>

<script>
import FileTile from "../components/FileTile";
import VideoPlayer from "../components/VideoPlayer";

export default {
  name: "PresentPage",
  components: {VideoPlayer, FileTile},
  props: ['id'],
  data() {
    return {
      files: [
        {
          'id': 1,
          'name': 'video1.mp4',
          'type': 'video'
        },
        {
          'id': 2,
          'name': 'audio.mp3',
          'type': 'audio'
        },
        {
          'id': 3,
          'name': 'powerpoint.pptx',
          'type': 'pptx'
        },
        {
          'id': 11,
          'name': 'video1.mp4',
          'type': 'video'
        },
        {
          'id': 22,
          'name': 'audio.mp3',
          'type': 'audio'
        },
        {
          'id': 33,
          'name': 'powerpoint.pptx',
          'type': 'pptx'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>