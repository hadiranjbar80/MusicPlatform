using Application.Core;
using AutoMapper;
using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Artists
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Artist Artist { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Artists.Add(request.Artist);
                await _context.SaveChangesAsync();

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}