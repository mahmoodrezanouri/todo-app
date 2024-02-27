
using System.ComponentModel.DataAnnotations;

namespace todo_app.Services.Models
{
    public class TodoTask
    {
        public TodoTask()
        {
            CreateDate = DateTime.Now;
        }
        public int Id { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(255, MinimumLength = 10, ErrorMessage = "Description must be between 10 and 255 characters.")]
        public string Description { get; set; }

        [FutureDate(ErrorMessage = "Deadline must be in the future.")]
        public DateTime? Deadline { get; set; }

        public DateTime CreateDate { get; private set; }

        public bool Done { get; private set; }

        public bool OverDue
        {
            get 
            {

                if (!Deadline.HasValue)
                    return false;

                return (DateTime.Now > Deadline);

            }
        }

        public void SetDone(bool done)
        {
            Done = done;
        }

    }

    public class FutureDateAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value is DateTime date && date > DateTime.Now)
            {
                return ValidationResult.Success;
            }

            return new ValidationResult(ErrorMessage);
        }
    }


}

