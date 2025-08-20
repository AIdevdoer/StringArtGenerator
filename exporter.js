(function(){
  function track(ev){
    if (window.plausible) {
      window.plausible(ev);
    } else if (window.analytics && window.analytics.track) {
      window.analytics.track(ev);
    } else {
      console.log('track', ev);
    }
  }
  window.track = track;

  function getParams(){
    return {
      pins: parseInt(document.getElementById('numberOfPins').value) || window.N_PINS,
      iterations: parseInt(document.getElementById('numberOfLines').value) || window.MAX_LINES,
      weight: parseInt(document.getElementById('lineWeight').value) || window.LINE_WEIGHT,
      seed: window.FILENAME || 'seed'
    };
  }
  window.getCurrentParams = getParams;

  function downloadBlob(blob, filename){
    document.getElementById('exportSize').textContent = '(' + (blob.size/1024).toFixed(1) + ' KB)';
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(()=>URL.revokeObjectURL(url), 1000);
  }

  window.exportSVG = function(params = getParams()){
    const pins = params.pins;
    const iterations = params.iterations;
    const seed = params.seed;
    let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+IMG_SIZE+'" height="'+IMG_SIZE+'" viewBox="0 0 '+IMG_SIZE+' '+IMG_SIZE+'">';
    svg += '<rect width="100%" height="100%" fill="white"/>';
    for(let i=1;i<window.line_sequence.length;i++){
      const p1 = window.pin_coords[window.line_sequence[i-1]];
      const p2 = window.pin_coords[window.line_sequence[i]];
      svg += '<line x1="'+p1[0]+'" y1="'+p1[1]+'" x2="'+p2[0]+'" y2="'+p2[1]+'" stroke="black" stroke-width="0.3"/>';
    }
    svg += '</svg>';
    const blob = new Blob([svg], {type:'image/svg+xml'});
    track('export_svg');
    downloadBlob(blob, 'string-art_'+pins+'-'+iterations+'-'+seed+'.svg');
  };

  window.exportPNG = function(params = getParams(), opts={}){
    const canvas = document.getElementById('canvasOutput2');
    const dpi = opts.dpi || 150;
    const transparentBg = opts.transparentBg !== undefined ? opts.transparentBg : true;
    const scale = dpi/96;
    const w = canvas.width * scale;
    const h = canvas.height * scale;
    const tmp = document.createElement('canvas');
    tmp.width = w; tmp.height = h;
    const ctx = tmp.getContext('2d');
    if(!transparentBg){ ctx.fillStyle = '#fff'; ctx.fillRect(0,0,w,h); }
    ctx.drawImage(canvas,0,0,w,h);
    tmp.toBlob(function(blob){
      track('export_png');
      downloadBlob(blob, 'string-art_'+params.pins+'-'+params.iterations+'-'+params.seed+'.png');
    });
  };

  window.exportPDF = function(params = getParams(), opts={}){
    const canvas = document.getElementById('canvasOutput2');
    const imgData = canvas.toDataURL('image/png',1.0);
    const paper = opts.paper || 'a4';
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({orientation:'portrait', unit:'mm', format:paper});
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData,'PNG',0,0,pageWidth,pageHeight);
    track('export_pdf');
    pdf.save('string-art_'+params.pins+'-'+params.iterations+'-'+params.seed+'.pdf');
  };

  function copy(text){
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  window.shareLink = function(){
    const params = getParams();
    const state = LZString.compressToEncodedURIComponent(JSON.stringify(params));
    const url = location.origin + location.pathname + '?state=' + state;
    if (navigator.share) {
      navigator.share({url}).catch(()=>copy(url));
    } else {
      copy(url);
    }
    track('share');
  };

  window.addEventListener('DOMContentLoaded', function(){
    const urlParams = new URLSearchParams(location.search);
    const state = urlParams.get('state');
    if(state){
      try{
        const params = JSON.parse(LZString.decompressFromEncodedURIComponent(state));
        if(params.pins){
          document.getElementById('numberOfPins').value = params.pins;
          window.N_PINS = params.pins;
        }
        if(params.lines){
          document.getElementById('numberOfLines').value = params.lines;
          window.MAX_LINES = params.lines;
        }
        if(params.weight){
          document.getElementById('lineWeight').value = params.weight;
          window.LINE_WEIGHT = params.weight;
        }
        if(params.seed){
          window.FILENAME = params.seed;
        }
      }catch(e){
        console.error(e);
      }
    }
  });
})();
