
using System.ComponentModel.DataAnnotations;

namespace todo_app.Services.Models
{
    public class TodoTask
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(255, MinimumLength = 10, ErrorMessage = "Description must be between 10 and 255 characters.")]
        public string Description { get; set; }

        //[FutureDate(ErrorMessage = "Deadline must be in the future.")]
        public DateTime? Deadline { get; set; }

        [FutureDate(ErrorMessage = "DueDate must be in the future.")]
        public DateTime? DueDate { get; set; }
        public bool Done { get; set; }
        public bool OverDue { get { if(Id == 2)return true; return false; } }
        
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

