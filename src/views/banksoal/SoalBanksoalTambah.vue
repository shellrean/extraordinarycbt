<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <router-link :to="{ name: 'banksoal.soal', params: { 'banksoal_id' : $route.params.banksoal_id } }" class="btn btn-light btn-sm">Kembali</router-link>
        </div>
        <div class="card-body">
            <div class="card">
              <div class="card-header">
                <b>Setting soal</b>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Tipe soal</label>
                      <select class="form-control" v-model="tipe_soal">
                        <option value="1">Pilihan ganda</option>
                        <option value="2">Essai</option>
                        <option value="3">Listening</option>
                      </select>
                    </div>
                    <div class="form-group" v-if="direction == '' && tipe_soal == 3">
                      <label>File direction</label>
                      <div class="input-group">
                        <div class="custom-file">
                          <input type="file" class="custom-file-input" @change="handleFileUploadDirection">
                          <label class="custom-file-label">{{ labelDirection ? labelDirection : 'Pilih File...' }}</label>
                        </div>
                        <div class="input-group-append">
                          <button class="btn btn-outline-dark" type="button" @click="submitFileDirection">Upload</button>
                        </div>
                      </div>
                    </div>
                    <div class="form-group" v-if="audio == ''">
                      <label>File audio</label>
                      <div class="input-group">
                        <div class="custom-file">
                          <input type="file" class="custom-file-input" @change="handleFileUpload">
                          <label class="custom-file-label">{{ labelAudio ? labelAudio : 'Pilih File...' }}</label>
                        </div>
                        <div class="input-group-append">
                          <button class="btn btn-outline-dark" type="button" @click="submitFile">Upload</button>
                        </div>
                      </div>
                    </div>
                    <div class="form-group" v-if="direction != ''">
                      <label>File direction</label>
                      <div class="input-group">
                        <audio-player :file="'/storage/audio/'+direction"></audio-player>
                        <b-button size="sm" variant="danger" @click="removeDirection"><font-awesome-icon icon="times" /></b-button>
                      </div>
                    </div>
                    <div class="form-group" v-if="audio != ''">
                      <label>File audio</label>
                      <div class="input-group">
                        <audio-player :file="'/storage/audio/'+audio"></audio-player>
                        <b-button size="sm" variant="danger" @click="removeAudio"><font-awesome-icon icon="times" /></b-button>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                   
                  </div>
                </div>
              </div>
            </div>
          <div class="card">
            <div class="card-header">
              <b>Pertanyaan</b>
            </div>
            <div class="card-body">
              <div class="editor">
                <editor-menu-bar :editor="question" v-slot="{ commands, isActive }">
                  <div class="menubar">
                    <button
                      class="menubar__button"
                      @click="showImagePrompt(commands.image)"
                    >
                      <font-awesome-icon icon="image" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.bold() }"
                      @click="commands.bold"
                    >
                      <font-awesome-icon icon="bold" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.italic() }"
                      @click="commands.italic"
                    >
                      <font-awesome-icon icon="italic" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.strike() }"
                      @click="commands.strike"
                    >
                      <font-awesome-icon icon="strikethrough" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.underline() }"
                      @click="commands.underline"
                    >
                      <font-awesome-icon icon="underline" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.paragraph() }"
                      @click="commands.paragraph"
                    >
                      <font-awesome-icon icon="paragraph" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                      @click="commands.heading({ level: 1 })"
                    >
                      H1
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                      @click="commands.heading({ level: 2 })"
                    >
                      H2
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                      @click="commands.heading({ level: 3 })"
                    >
                      H3
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.bullet_list() }"
                      @click="commands.bullet_list"
                    >
                      <font-awesome-icon icon="list" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.ordered_list() }"
                      @click="commands.ordered_list"
                    >
                      <font-awesome-icon icon="list-ol" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.blockquote() }"
                      @click="commands.blockquote"
                    >
                      <font-awesome-icon icon="quote-right" />
                    </button>
                    <button
                      class="menubar__button"
                      @click="commands.undo"
                    >
                      <font-awesome-icon icon="undo" />
                    </button>

                    <button
                      class="menubar__button"
                      @click="commands.redo"
                    >
                      <font-awesome-icon icon="redo" />
                    </button>
                  </div>
                </editor-menu-bar>
                <editor-content class="editor__content" :editor="question" />
              </div>
            </div>
          </div>
          <div class="card" v-if="tipe_soal == 2">
            <div class="card-header">
              <b>Jawaban rujukan</b>
            </div>
            <div class="card-body">
              <div class="editor">
                <editor-menu-bar :editor="rujukan" v-slot="{ commands, isActive }">
                  <div class="menubar">
                    <button
                      class="menubar__button"
                      @click="showImagePrompt(commands.image)"
                    >
                      <font-awesome-icon icon="image" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.bold() }"
                      @click="commands.bold"
                    >
                      <font-awesome-icon icon="bold" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.italic() }"
                      @click="commands.italic"
                    >
                      <font-awesome-icon icon="italic" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.strike() }"
                      @click="commands.strike"
                    >
                      <font-awesome-icon icon="strikethrough" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.underline() }"
                      @click="commands.underline"
                    >
                      <font-awesome-icon icon="underline" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.paragraph() }"
                      @click="commands.paragraph"
                    >
                      <font-awesome-icon icon="paragraph" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                      @click="commands.heading({ level: 1 })"
                    >
                      H1
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                      @click="commands.heading({ level: 2 })"
                    >
                      H2
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                      @click="commands.heading({ level: 3 })"
                    >
                      H3
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.bullet_list() }"
                      @click="commands.bullet_list"
                    >
                      <font-awesome-icon icon="list" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.ordered_list() }"
                      @click="commands.ordered_list"
                    >
                      <font-awesome-icon icon="list-ol" />
                    </button>
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.blockquote() }"
                      @click="commands.blockquote"
                    >
                      <font-awesome-icon icon="quote-right" />
                    </button>
                    <button
                      class="menubar__button"
                      @click="commands.undo"
                    >
                      <font-awesome-icon icon="undo" />
                    </button>

                    <button
                      class="menubar__button"
                      @click="commands.redo"
                    >
                      <font-awesome-icon icon="redo" />
                    </button>
                  </div>
                </editor-menu-bar>
                <editor-content class="editor__content" :editor="rujukan" />
              </div>
            </div>
          </div>
          <div class="card" v-if="tipe_soal != 2">
            <div class="card-header">
              <b>Pilihan</b>
            </div>
            <div class="card-body">
              <div class="editor">
              <table class="table table-borderless">
                <tr v-for="(pilih, index) in pilihan">
                  <td width="10px">
                    <b-form-radio name="correct" size="lg" :value="index" v-model="correct"><span class="text-uppercase">{{ index | charIndex }}</span></b-form-radio>
                    
                  </td>
                  <td>
                    <editor-menu-bar :editor="pilihan[index]" v-slot="{ commands, isActive }">
                    <div class="menubar">
                      <button
                        class="menubar__button"
                        @click="showImagePrompt(commands.image)"
                      >
                        <font-awesome-icon icon="image" />
                      </button>
                      <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.bold() }"
                        @click="commands.bold"
                      >
                        <font-awesome-icon icon="bold" />
                      </button>
                      <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.italic() }"
                        @click="commands.italic"
                      >
                        <font-awesome-icon icon="italic" />
                      </button>
                      <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.strike() }"
                        @click="commands.strike"
                      >
                        <font-awesome-icon icon="strikethrough" />
                      </button>
                      <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.underline() }"
                        @click="commands.underline"
                      >
                        <font-awesome-icon icon="underline" />
                      </button>
                      <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.paragraph() }"
                        @click="commands.paragraph"
                      >
                        <font-awesome-icon icon="paragraph" />
                      </button>
                      <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({ level: 1 })"
                      >
                        H1
                      </button>

                      <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                        @click="commands.heading({ level: 2 })"
                      >
                        H2
                      </button>

                      <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                        @click="commands.heading({ level: 3 })"
                      >
                        H3
                      </button>
                      <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.bullet_list() }"
                        @click="commands.bullet_list"
                      >
                        <font-awesome-icon icon="list" />
                      </button>
                      <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.ordered_list() }"
                        @click="commands.ordered_list"
                      >
                        <font-awesome-icon icon="list-ol" />
                      </button>
                      <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.blockquote() }"
                        @click="commands.blockquote"
                      >
                        <font-awesome-icon icon="quote-right" />
                      </button>
                      <button
                        class="menubar__button"
                        @click="commands.undo"
                      >
                        <font-awesome-icon icon="undo" />
                      </button>

                      <button
                        class="menubar__button"
                        @click="commands.redo"
                      >
                        <font-awesome-icon icon="redo" />
                      </button>
                    </div>
                    </editor-menu-bar>
                    <editor-content class="editor__content" :editor="pilihan[index]" />
                  </td>
                </tr>
              </table>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <b-button variant="primary" size="sm" :disabled="isLoading" @click.prevent="postSoalBanksoal">
            <b-spinner small type="grow" v-show="isLoading"></b-spinner>
            Simpan
          </b-button>
        </div>
      </div>
    </div>
    <b-modal id="modal-scoped" hide-backdrop size="xl">
        <template v-slot:modal-header="{ close }">
          <h5>Pilih gambar</h5>
        </template>
        <div class="row">
          <div class="col-md-4">
            <img :src="gambar_pilih" style="max-width: 100%"> <br> <br>
            <b-button size="sm" v-show="gambar_pilih != ''" variant="primary" @click="masukGambar">Masukkan gambar</b-button>
          </div>
          <div class="col-md-8">
            <div class="row">
            <div class="col-sm-12 mb-1">
              <div class="input-group">
              <div class="custom-file">
                <input type="file" class="custom-file-input" @change="onFileChange">
                <label class="custom-file-label">{{ label ? label : 'Pilih File...' }}</label>
              </div>
              <div class="input-group-append">
                <button class="btn btn-outline-primary" type="button" @click="uploadFile">Upload</button>
              </div>
              </div>
            </div>
          </div>
          <template v-if="contentDirectory && typeof contentDirectory.data != 'undefined'">
            <table class="table table-striped table-hover table-bordered">
              <tr>
                <td>Nama file</td>
                <td>View</td>
                <td>Aksi</td>
              </tr>
              <tr v-for="(content,index) in contentDirectory.data">
                <td><a class="text-info" v-text="content.filename"></a></td>
                <td>
                  <img :src="baseURL+'/storage/'+content.dirname+'/'+content.filename" class="img-thumbnail rounded-0" style="max-width: 100px">
                </td>
                <td>
                  <b-button variant="primary" size="sm" @click="pilihGambar(index)">
                    Lihat
                  </b-button>
                </td>
              </tr>
            </table>
            <b-pagination
              v-model="page"
              size="sm"
              :total-rows="contentDirectory.total"
              :per-page="contentDirectory.per_page"
              aria-controls="products"
              v-if="contentDirectory.data && contentDirectory.data.length > 0"
              ></b-pagination>
          </template>
          <template v-else>
            <div class="text-center text-light my-2">
              <b-spinner small type="grow"></b-spinner>
            </div>
          </template>
          </div>
        </div>
        <template v-slot:modal-footer="{cancel}">
          <b-button size="sm" variant="secondary" @click="cancel()">
            Tutup
          </b-button>
        </template>
    </b-modal>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import { Editor, EditorContent, EditorFloatingMenu,EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  ListItem,
  OrderedList,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Placeholder,
  Image,
} from 'tiptap-extensions'
import AudioPlayer from '../../components/AudioPlayer.vue'
export default {
  created() {
    this.getBanksoal(this.$route.params.banksoal_id)
  },
  components: {
    EditorContent,
    EditorFloatingMenu,
    EditorMenuBar,
    AudioPlayer
  },
  data() {
    return {
      correct: '',
      question : new Editor({
        extensions: [
          new Blockquote(),
          new Image(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Placeholder({
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Tulis pertanyaan …',
            showOnlyWhenEditable: true,
          })
        ],
        content: ''
      }),
      rujukan : new Editor({
        extensions: [
          new Blockquote(),
          new Image(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Placeholder({
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Tulis jawaban rujukan …',
            showOnlyWhenEditable: true,
          })
        ],
        content: ''
      }),
      pilihan: [],
      jmlh_pilihan: '',
      gambar_pilih: '',
      command: '',
      direktory: '',
      tipe_soal: 1,
      audio: '',
      direction: '',
      fileAudio: '',
      fileDirection: '',
      labelAudio: '',
      labelDirection: '',
      label: '',
      image: '',
      baseURL: process.env.VUE_APP_API_SERVER
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapState(['errors']),
    ...mapState('banksoal',{
      banksoal: state => state.banksoal.data
    }),
    ...mapState('filemedia', {
      contentDirectory: state => state.contentFilemedia,
      directories: state => state.directories.data
    }),
    page: {
      get() {
        return this.$store.state.filemedia.page
      },
      set(val) {
        this.$store.commit('filemedia/SET_PAGE', val)
      }
    }
  },
  filters: {
		charIndex(i) {
			return String.fromCharCode(97 + i)
		}
	},
  methods: {
    ...mapActions('filemedia', ['getContentFilemedia','getDirectories','uploadFileAudio','getDirectory','addFilemedia']),
    ...mapActions('banksoal',['addSoalBanksoal','getBanksoal']),
    ...mapMutations(['CLEAR_ERRORS','SET_LOADING']),
    postSoalBanksoal() {
      if (this.correct === '' && this.tipe_soal == 1) {
        this.$swal({
          title: 'Kunci jawaban kosong',
          text: "Pilih jawaban yang benar",
          icon: 'error',
        })
        return
      }
      else {
        this.SET_LOADING(true)
        let sender = []
        this.pilihan.forEach(function(item) {
          sender.push(item.getHTML())
        })
        this.addSoalBanksoal({
          pertanyaan: this.question.getHTML(),
          rujukan: this.rujukan.getHTML(),
          banksoal_id: this.$route.params.banksoal_id,
          pilihan: sender,
          correct: this.correct,
          tipe_soal: this.tipe_soal,
          audio: this.audio,
          direction: this.direction
        })
        .then((data) => {
          this.$notify({
            group: 'foo',
            title: 'Sukses',
            type: 'success',
            text: 'Soal berhasil disimpan.'
          }),
          this.clearForm()
        })
        .catch(() => {
          this.$notify({
            group: 'foo',
            title: 'Error',
            type: 'error',
            text: 'Terjadi kesalahan saat menyimpan soal'
          })
        })
      }
    },
    onFileChange(e) {
      this.label = e.target.files[0].name
      this.image = e.target.files[0]
    },
    uploadFile() {
      let formData = new FormData()
      formData.append('directory_id', this.banksoal.directory_id)
      formData.append('image',this.image)
      this.addFilemedia(formData)
      .then(() => 
        this.getContentFilemedia(this.banksoal.directory_id),
        this.$notify({
          group: 'foo',
          title: 'Sukses',
          type: 'success',
          text: 'Filemedia berhasil ditambahkan.'
        })
      )
    },    
    clearForm() {
      this.question.setContent(''),
      this.rujukan.setContent(''),
      this.correct = '',
      this.pilihan.forEach(function(item) {
        item.setContent('')
      })
      this.audio = '',
      this.labelAudio = '',
      this.fileAudio = '',
      this.direction = '',
      this.labelDirection = '',
      this.fileAudio = ''
    },
    initEditor() {
      let i
      for(i=0; i<this.jmlh_pilihan; i++) {
        let pilihan = new Editor({
          extensions: [
            new Blockquote(),
            new Image(),
            new BulletList(),
            new CodeBlock(),
            new HardBreak(),
            new Heading({ levels: [1, 2, 3] }),
            new ListItem(),
            new OrderedList(),
            new TodoItem(),
            new TodoList(),
            new Link(),
            new Bold(),
            new Code(),
            new Italic(),
            new Strike(),
            new Underline(),
            new History(),
            new Placeholder({
              emptyNodeClass: 'is-empty',
              emptyNodeText: `Tulis pilihan${i+1} …`,
              showOnlyWhenEditable: true,
            })
          ],
          content: ''
        })

        this.pilihan.push(pilihan)
      }
    },
    showImagePrompt(command) {
      this.$bvModal.show('modal-scoped')
      this.command = command
    },
    onSelectImage(e) {

    },
    pilihGambar(index) {
      const gambar = this.contentDirectory.data[index]
      this.gambar_pilih = this.baseURL+'/storage/'+gambar.dirname+'/'+gambar.filename
    },
    masukGambar() {
      const command = this.command
      const src = this.gambar_pilih
      command({ src })
    },
    getContentFile() {
      if(this.direktory != '') {
        this.getContentFilemedia(this.direktory)
      }
    },
    handleFileUpload(e) {
      this.labelAudio = e.target.files[0].name
      this.fileAudio = e.target.files[0];
    },
    handleFileUploadDirection(e) {
      this.labelDirection = e.target.files[0].name
      this.fileDirection = e.target.files[0];
    },
    submitFile(){
      let formData = new FormData();
      formData.append('file', this.fileAudio);
      this.uploadFileAudio(formData)
      .then((res) => {
        this.audio = res.data
        this.fileAudio = ''
        this.labelAudio = ''
      })
    },
    submitFileDirection(){
      let formData = new FormData();
      formData.append('file', this.fileDirection);
      this.uploadFileAudio(formData)
      .then((res) => {
        this.direction = res.data
        this.fileDirection = ''
        this.labelDirection = ''
      })
    },
    removeAudio() {
      this.audio = ''
    },
    removeDirection() {
      this.direction = ''
    }
  },
  watch: {
    banksoal(val) {
      this.jmlh_pilihan = val.jumlah_pilihan
      this.initEditor()
      this.getContentFilemedia(val.directory_id)
    },
    direktory(val) {
      if(val != '') {
        this.getContentFilemedia(val)
      }
    },
    page() {
      this.getContentFilemedia(this.banksoal.directory_id)
    }
  }
}
</script>
<style lang="scss">
.menubar {

  margin-bottom: 1rem;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

  &.is-hidden {
    visibility: hidden;
    opacity: 0;
  }

  &.is-focused {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }

  &__button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #000000;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: rgba(#000000, 0.05);
    }

    &.is-active {
      background-color: rgba(#000000, 0.1);
    }
  }

  span#{&}__button {
    font-size: 13.3333px;
  }
}
</style>