describe('Uploading files', () => {
  it('should be able to upload a file', () => {
    // The name of the file that needs to be uploaded
    const fileName = 'forkme_right_green_007200.png';

    // 1a.  Load the browser
    browser.url('/upload');
    // 1b.  Set the browser to a smaller screen just for watching
    browser.windowHandleSize({ width: 640, height: 480 });

    // 3a.  Upload the file by adding the location to the file on the machine,
    //      The path and file CAN'T be joined with NodeJS version of `join` because
    //      the tests are executed on different platforms, otherwise only the platform
    //      that executes the test determines the way of the slashes
    //      The platformFolder folder is determined in the `before`-hook of the `wdio.sauce.upload.conf.js`
    $('#file-upload').setValue(`${ browser.platformFolder }${ fileName }`);
    // 3b.  Submit the file upload
    $('#file-submit').click();

    // 4a.  Wait for the text to be visible, we are now validating it with the uploaded file container to be visible
    $('#uploaded-files').waitForVisible(15000);
    // 4b.  Do the verification
    expect($('#uploaded-files').getText()).toContain(fileName);
  });
});