<script>
    import articles from '/src/article_json/articles.json';
    import Editor from '@tinymce/tinymce-svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import ImagesPopup from '/src/routes/profile/createArticle/images/images.svelte'; 
    import { account } from '/src/routes/account.js';

    const API_URL = 'http://localhost:3000/';

    let accountId;
    let submitType;

    account.subscribe((id) => {
      accountId = id;
    });

    let title = '';
    let author = '';
    let articleText = '';
    let selectedFiles = [];

    const handleFileInput = (event) => {
      selectedFiles = Array.from(event.target.files);
    };

    function setSave() {
      submitType = 'save';
    }

    function setSend() {
      submitType = 'send';
    }

    async function handleSubmit () {
      console.log('Handling form submit...');
      
      let formData;
      let key = 0;
      let imageIds = {};

      selectedFiles.forEach(async (file) => {
        formData = new FormData();
        formData.append('image', selectedFiles[0]);
        formData.append('advertisement', false);
        
        const response = await axios.post(API_URL+"api/images", formData);
        imageIds[key++] = response.data._id;
      })

      console.log(imageIds)

      const article = {
        title: title,
        author: author,
        content: articleText,
        super: false,
        topic: document.getElementById('topics').value,
        views: 0,
        status: 'Pending review',
        reason: 'Recently submitted',
        authorid: accountId
      }

      if (submitType == 'save') article['status'] = 'Draft'

      console.log(article);

      const data = JSON.stringify(article);
      const images = JSON.stringify(imageIds);

      console.log(data);
      console.log(images);

      const response = await axios.post(API_URL+"api/articles", data);
      console.log(response);

      // Reset form fields
      title = '';
      author = '';
      articleText = '';
      
      console.log('Article submitted!');
    };

    let imagesPopupVisible = false;  

    function toggleImagesPopup() {
      imagesPopupVisible = !imagesPopupVisible;
    }

    function closeImagesPopup() {
      imagesPopupVisible = false;
    }
</script>

<div class="form-container">
    <h1>Write an Article</h1>

    <form on:submit={handleSubmit}>
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" bind:value={title} required />
      </div>
    
      <div>
        <label for="author">Author:</label>
        <input type="text" id="author" bind:value={author} required />
      </div>
    
      <div>
        <label for="articleText">Article Content:</label>
        <Editor apiKey="s6fbao0y00rlqyh56hzalaphukeu65pwwospfmj68e692t56" type="text" id="articleText" bind:value={articleText} required />
      </div>
    
      <div>
        <label for="attachments">Attachments (Images or Videos):</label>
        <input
          type="file"
          id="attachments"
          multiple
          accept="image/*,video/*"
          on:change={handleFileInput}
        />
      </div>
      <div>
        <label for="addAttachments">Add Attachments (Images or Videos):</label>
        <button on:click={toggleImagesPopup}>Choose images</button>
      </div>
      <div>
        <label for="topic">Article Topic:</label>
        <select name="topic" id="topics">
          <option value="medicine">Medicine</option>
          <option value="music">Music</option>
          <option value="nature">Nature</option>
          <option value="politics">Politics</option>
          <option value="sports">Sports</option>
          <option value="travel">Travel</option>
        </select>
      </div>
    
      <div>
        <button type="submit" id="save" on:click={setSave}>Save</button>
        <button type="submit" id="send" on:click={setSend}>Submit for approval</button>
      </div>
    </form>
</div>

{#if imagesPopupVisible}
    <ImagesPopup on:close={closeImagesPopup}/>
{/if}

<style>
  .form-container {
    margin-top: 200px;
  }

  form {
    position: absolute;
    top: 15%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  div {
    margin-bottom: 15px;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input[type="text"],
  textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  textarea {
    height: 150px;
  }

  button[type="submit"] {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button[type="submit"]:hover {
    background-color: #0056b3;
  }
</style>
