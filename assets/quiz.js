/* Reusable quiz widget for the Rubik's Cube course.
 *
 * Usage in a lesson:
 *   <div class="quiz" data-answer="1">
 *     <div class="q">Question text?</div>
 *     <button class="opt">Wrong option</button>
 *     <button class="opt">Right option</button>   <!-- index 1, matches data-answer -->
 *     <button class="opt">Wrong option</button>
 *     <div class="feedback" data-correct="Why it's right." data-wrong="Nudge toward the idea."></div>
 *   </div>
 *
 * Immediate, automatic feedback = the tight feedback loop the course wants.
 * Keep option text equal-length so formatting gives no clues.
 */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".quiz").forEach(function (quiz) {
    var answer = parseInt(quiz.getAttribute("data-answer"), 10);
    var opts = Array.prototype.slice.call(quiz.querySelectorAll("button.opt"));
    var fb = quiz.querySelector(".feedback");
    var done = false;

    if (fb) fb.setAttribute("aria-live", "polite");

    opts.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        if (done) return;
        done = true;
        opts.forEach(function (b, j) {
          if (j === answer) b.classList.add("correct");
          b.disabled = true;
        });
        if (i === answer) {
          if (fb) fb.textContent = "✓ " + (fb.getAttribute("data-correct") || "Correct.");
        } else {
          btn.classList.add("wrong");
          if (fb) fb.textContent = "✗ " + (fb.getAttribute("data-wrong") || "Not quite — see the highlighted answer.");
        }
      });
    });
  });
});
